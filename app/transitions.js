export default function(){
  this.transition(
    this.fromRoute('browse'),
    this.toRoute('package_category'),
    this.use('toLeft', {duration: 800}),
    this.reverse('toRight', {duration: 800})
  );

  this.transition(
    this.fromRoute('package_category'),
    this.toRoute('item'),
    this.use('toLeft', {duration: 500}),
    this.reverse('toRight', {duration: 500})
  );

  this.transition(
    this.fromRoute('browse'),
    this.toRoute('item'),
    this.use('toLeft', {duration: 500}),
    this.reverse('toRight', {duration: 500})
  );
}
