export default function(){
  this.transition(
    this.fromRoute('browse'),
    this.toRoute('package_category'),
    this.use('toUp', {duration: 800}),
    this.reverse('toDown', {duration: 800})
  );

  this.transition(
    this.fromRoute('package_category'),
    this.toRoute('item'),
    this.use('fade', {duration: 500}),
    this.reverse('fade', {duration: 500})
  );

  this.transition(
    this.fromRoute('browse'),
    this.toRoute('item'),
    this.use('toUp', {duration: 800}),
    this.reverse('toDown', {duration: 800})
  );
}
