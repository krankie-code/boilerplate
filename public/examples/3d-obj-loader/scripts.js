var scene = new THREE.Scene();
var ourObj2;
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 100000 );
camera.position.z = 12000;


var renderer = new THREE.WebGLRenderer();
renderer.setClearColor("#DDDDDD");
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
})

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setTexturePath('/examples/3d-obj-loader/assets/');
mtlLoader.load('../../examples/3d-obj-loader/assets/d42e1845-f80e-424f-abc8-cf27ba30bee1.mtl', function (materials) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('../../examples/3d-obj-loader/assets/d42e1845-f80e-424f-abc8-cf27ba30bee1.obj', function (object) {

        scene.add(object);
        ourObj2 = object;
        object.position.y -= 3000;
        
        

    });

});

var animate = function () {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render(scene, camera);
};

animate();
 


 var render = function() {
     requestAnimationFrame(render);
     
     // Rotate the objects indefinitely
     
     ourObj2.rotation.y += .03;

     renderer.render(scene, camera);
 }

 // Call this to render the entire scene
 render();




 /* // Create a material
 var mtlLoader = new THREE.MTLLoader();
 mtlLoader.setTexturePath('/examples/3d-obj-loader/assets/');
 mtlLoader.load('../../examples/3d-obj-loader/assets/d42e1845-f80e-424f-abc8-cf27ba30bee1.mtl', function (materials) {

     materials.preload();

     // Load the object
     var objLoader = new THREE.OBJLoader();
     objLoader.setMaterials(materials);
     objLoader.load('../../examples/3d-obj-loader/assets/d42e1845-f80e-424f-abc8-cf27ba30bee1.obj', function (object) {
         scene.add(object);
         console.log(object);
         ourObj2 = object;
         object.position.z -= 60        ;
         object.rotation.x = 250;

         this.tl = new TimelineMax();
         this.tl.from(ourObj2.scale, 2, {y: 0, x:0, z: 0, ease: Expo.easeOut})
         this.tl.from(ourObj2.position, 2, {y: 0, z: -30,  ease: Expo.easeOut})
         this.tl.from(ourObj.scale, 2, {x: 1.5, y: 1.5, z: 0, ease: Expo.easeOut}, '-=2')
         this.tl.from(ourObj.position, 1, {y: -20, ease: Expo.easeOut}, '-=3') 
     });
 });

  */