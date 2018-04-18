lock '3.4.0'
require "fileutils"
ROOT_PATH = File.dirname(__FILE__)

set :application, 'browse.goodcity'
set :deploy_to, '/var/www/html/browse.goodcity.hk'
set :shared_repo, 'https://github.com/crossroads/shared.goodcity.git'
set :log_level, :info

namespace :deploy do
  desc "Locally build the ember site"
  task :build do
    run_locally do
      env = {}
      env["staging"] = "true" if fetch(:stage) == :staging
      system(env, "ember build --environment=production")
    end
  end

  task :upload_cordova_folder do
    puts "inside upload cordova"
    on roles(:web) do
      puts "#{ROOT_PATH}/cordova/"
      puts "#{deploy_to}/cordova"
      sh %{ "ln -nfs #{ROOT_PATH}/cordova #{deploy_to}/cordova" }
    end
  end

  desc "Upload the ember build"
  task :upload do
    tarball = "#{fetch(:application)}.tar.gz"
    run_locally do
      within "dist" do
        execute :rm, "-f", tarball
        execute :tar, "-zcf", tarball, "*"
      end
    end
    on roles(:web) do
      remote_tarball_path = File.join(deploy_to, tarball)
      upload! File.join("dist", tarball), deploy_to
      within deploy_to do
        execute :tar, "-zxvf", remote_tarball_path
        execute :rm, "-f", remote_tarball_path
      end
    end
    run_locally do
      within "dist" do
        execute :rm, "-f", tarball
      end
    end
  end
end

task deploy: %w(deploy:build deploy:upload)
after 'deploy:build', 'deploy:upload_cordova_folder'
