# When a successful build is completed on CircleCI, a message 'build admin.goodcity' or 'build app.goodcity' is placed in an IronMQ queue.
# This script checks in with IronMQ to find out if it should start a build.
# If it finds a message on the queue, it deletes it and starts the build.

# REQUIRED ENVIRONMENT VARS (place in ~/.bash_profile)
# export TESTFAIRY_API_KEY=
# export GOODCITY_IRON_MQ_OAUTH_KEY=
# export GOODCITY_IRON_MQ_PROJECT_KEY=
# export GOODCITY_IRON_MQ_QUEUE_NAME=

# Script config
PROJECT_NAME=browse.goodcity # must match the folder name of the project
APP_NAME="S. Browse GoodCity" # must match <name> in config.xml
STAGING=true # true|false - for admin-staging|admin.goodcity production builds

# Then insert this script into the crontab
# * * * * * source /Users/developer/.bash_profile; /Users/developer/Workspace/app.goodcity/cordova/deploy/deploy-ios-testfairy.sh  >> /tmp/goodcity_app_ios_build.log 2>&1



###################
# Shouldn't need to set any variables below this line

# To aid debugging in cron environment
# * * * * * env > ~/cronenv
# env - `cat ~/cronenv` /bin/sh /Users/developer/Workspace/admin.goodcity/cordova/deploy/deploy-ios-testfairy.sh 
# /Users/developer/Workspace/admin.goodcity/cordova/deploy/deploy-ios-testfairy.sh

GIT=`which git`
BOWER=`which bower`
NPM=`which npm`
EMBER=`which ember`
CORDOVA=`which cordova`
XCRUN=`which xcrun`
RM=`which rm`
ECHO=`which echo`
DATE=`which date`

WORKSPACE="$HOME/Workspace"
PROJECT_HOME="${WORKSPACE}/${PROJECT_NAME}"
LOCK_FILE="${PROJECT_HOME}/.ios_build.lock"
APP_PATH="${PROJECT_HOME}/cordova/platforms/ios/build/device/${APP_NAME}"

# This function uses python to parse the json data returned from IronMQ curl call
# Usage: getJsonVal "['text']"
function getJsonVal () { 
    python -c "import json,sys;sys.stdout.write(json.dumps(json.load(sys.stdin)$1))"; 
}

# Date stamps log output
# Usage: log "Hello World!" -> 07/07/2015 15:57:32 Hello World
function log() {
    ${ECHO} $(${DATE} +"%Y-%m-%d %H:%M:%S") [$$] $1
}

# Create a lock file so only one script is running at any one time
function create_lock(){
    touch "${LOCK_FILE}"
}
function delete_lock() {
	rm -f "${LOCK_FILE}"
}
function delete_lock_and_exit() {
	delete_lock
	exit 1
}

if [ -z "${TESTFAIRY_API_KEY}" ]; then
	log "Please add TESTFAIRY_API_KEY to your .bash_profile"
	delete_lock_and_exit
fi

if [ -z "${GOODCITY_IRON_MQ_OAUTH_KEY}" ]; then
	log "Please add GOODCITY_IRON_MQ_OAUTH_KEY to your .bash_profile"
	delete_lock_and_exit
fi

if [ -z "${GOODCITY_IRON_MQ_PROJECT_KEY}" ]; then
	log "Please add GOODCITY_IRON_MQ_PROJECT_KEY to your .bash_profile"
	delete_lock_and_exit
fi

if [ -z "${GOODCITY_IRON_MQ_QUEUE_NAME}" ]; then
	log "Please add GOODCITY_IRON_MQ_QUEUE_NAME to your .bash_profile"
	delete_lock_and_exit
fi

if [ -e "${LOCK_FILE}" ]
then
    log "Lock file (${LOCK_FILE}) exists. Another build is running. Terminating. (If build is not running, manually remove this file.)"
    exit 1
else
    create_lock
fi

log "$($NOW) Checking IronMQ for new ${PROJECT_NAME} builds..."
MSG_BODY=$(curl --silent -H "Content-Type: application/json" -H "Authorization: OAuth ${GOODCITY_IRON_MQ_OAUTH_KEY}" "https://mq-aws-us-east-1.iron.io/1/projects/${GOODCITY_IRON_MQ_PROJECT_KEY}/queues/${GOODCITY_IRON_MQ_QUEUE_NAME}/messages?timeout=10")
${ECHO} ${MSG_BODY} | grep "build ${PROJECT_NAME}"
if [ $? -ne 0 ]; then
	log "Nothing to build for ${PROJECT_NAME}. Terminating."
	delete_lock_and_exit
fi

# Remove the queue entry before building
log "Build requested. Deleting queue message and building project."
MESSAGE_ID=$(${ECHO} ${MSG_BODY} | getJsonVal "['messages'][0]['id']" | sed -e 's,",,g')
DELETED_MSG_BODY=$(curl --silent -H "Authorization: OAuth ${GOODCITY_IRON_MQ_OAUTH_KEY}" -H "Content-Type: application/json" -X DELETE "https://mq-aws-us-east-1.iron.io/1/projects/${GOODCITY_IRON_MQ_PROJECT_KEY}/queues/${GOODCITY_IRON_MQ_QUEUE_NAME}/messages/${MESSAGE_ID}")
echo ${DELETED_MSG_BODY} | grep 'Deleted'
if [ $? -ne 0 ]; then
	log "Error deleting message from queue. Terminating."
	delete_lock_and_exit
fi

log "Starting the deployment process."

cd "${WORKSPACE}/shared.goodcity/"
log "Updating shared.goodcity"
${GIT} pull >/dev/null
if [ $? -ne 0 ]; then
	log "Error during 'git pull'. Terminating."
	delete_lock_and_exit
fi
${BOWER} install >/dev/null
if [ $? -ne 0 ]; then
	log "Error during 'bower install'. Terminating."
	delete_lock_and_exit
fi
${NPM} install >/dev/null
if [ $? -ne 0 ]; then
	log "Error during 'npm install'. Terminating."
	delete_lock_and_exit
fi

log "Updating ${PROJECT_NAME}"
cd "${PROJECT_HOME}/"
${GIT} pull >/dev/null
if [ $? -ne 0 ]; then
	log "Error during 'git pull'. Terminating."
	delete_lock_and_exit
fi
${BOWER} install >/dev/null
if [ $? -ne 0 ]; then
	log "Error during 'bower install'. Terminating."
	delete_lock_and_exit
fi
${NPM} install >/dev/null
if [ $? -ne 0 ]; then
	log "Error during 'npm install'. Terminating."
	delete_lock_and_exit
fi

log "Preparing cordova project"
${EMBER} cordova:prepare >/dev/null
if [ $? -ne 0 ]; then
	log "Error during 'ember cordova:prepare'. Terminating."
	delete_lock_and_exit
fi

log "Building cordova project"
staging=${STAGING} ${EMBER} cordova:build --environment=production --platform=ios >/dev/null
if [ $? -ne 0 ]; then
	log "Error during 'ember cordova:build --environment=production --platform=ios'. Terminating."
	delete_lock_and_exit
fi

log "Building ios app"
cd "${PROJECT_HOME}/cordova/"
${CORDOVA} build ios --device
if [ $? -ne 0 ]; then
	log "Error during 'cordova build ios --device'. Terminating."
	delete_lock_and_exit
fi

if [ -e "${APP_PATH}.ipa" ]
then
    log "Removing existing IPA"
    ${RM} "${APP_PATH}.ipa"
fi

log "Generating IPA"
${XCRUN} -sdk iphoneos PackageApplication "${APP_PATH}.app" -o "${APP_PATH}.ipa"
if [ $? -ne 0 ]; then
	log "Error during 'xcrun -sdk iphoneos PackageApplication'. Terminating."
	delete_lock_and_exit
fi

if [ -e "${APP_PATH}.ipa" ]
then
    log "Uploading IPA to TestFairy"
    ${PROJECT_HOME}/cordova/deploy/testfairy-uploader-ios.sh "${APP_PATH}.ipa"
else
    log "IPA file does not exist. Please check the build process. Terminating."
fi
