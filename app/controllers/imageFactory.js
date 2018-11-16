// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
//
// var scanner = Titanium.UI.createView({
// width : 260,
// height : 200,
// borderColor : 'red',
// borderWidth : 5,
// borderRadius : 15
// });
//
// var button = Titanium.UI.createButton({
// color : '#fff',
// bottom : 10,
// width : 301,
// height : 57,
// font : {
// fontSize : 20,
// fontWeight : 'bold',
// fontFamily : 'Helvetica Neue'
// },
// title : 'Take Picture'
// });
// $.win.add(button);
//
// var overlay = Titanium.UI.createView();
// overlay.add(scanner);
// overlay.add(button);
//
// button.addEventListener('click', function() {
// scanner.borderColor = 'blue';
// Ti.Media.takePicture();
// abrirCamara();
// });
//
// var imageView = Ti.UI.createImageView({
// width : 320,
// height : 280,
// borderColor: 'yellow',
// borderRadius: 3,
// });
// $.win.add(imageView);
//
// function abrirCamara() {
// Titanium.Media.showCamera({
// saveToPhotoGallery : true,
// success : function(event) {
// imageView.image = event.media;
// },
// cancel : function() {
// },
// error : function(error) {
// var a = Titanium.UI.createAlertDialog({
// title : 'Camera'
// });
// if (error.code == Titanium.Media.NO_CAMERA) {
// a.setMessage('Please run this test on device');
// } else {
// a.setMessage('Unexpected error: ' + error.code);
// }
// a.show();
// },
// overlay : overlay,
// showControls : true, // don't show system controls
// });
// }

var open_camera = Ti.UI.createButton({
	height : Ti.UI.SIZE,
	width : Ti.UI.SIZE,
	bottom : 50,
	title : 'Camera'
});
// Adding the "open camera" button
$.win.add(open_camera);

var imageView = Ti.UI.createImageView({
	width : 320,
	height : 280,
	borderColor : 'yellow',
	borderRadius : 3,
});
$.win.add(imageView);

// Function to show the camera
function openCamera() {
	//alert('opening');
	open_camera.backgroundColor = "blue";
	// Just checking if we got here
	// The camera overlay I want displayed over the camera
	var camera_overlay = Ti.UI.createView({
		//top : 0,
		//left : 0,
		height : '150dp',
		width : '100dp',
		borderColor : 'red',
		borderRadius : 3,
		borderWidth : 3,
	});
	var overlay = Ti.UI.createView({
		//top : 0,
		//left : 0,
		height : '280dp',
		width : '350dp',
		borderColor : 'red',
		borderRadius : 3,
		borderWidth : 3,
	});
	camera_overlay.add(overlay);

	var take_picture = Ti.UI.createButton({
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		bottom : 50,
		title : 'Tomar Foto'
	});
	take_picture.addEventListener('click', function() {
		Ti.Media.takePicture();
	});
	camera_overlay.add(take_picture);
	// The actual show camera part
	Ti.Media.showCamera({
		success : function(e) {
			//alert('success');
			// I want this!
			imageView.image = e.media;
			imageView.width = Ti.UI.FILL;
			imageView.height = Ti.UI.FILL;
		},

		cancel : function(e) {
		},
		error : function(error) {
			alert('ERROR IN' + error.code);
		},
		// autohide: false,
		// showControls: false,
		//mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO],
		overlay : camera_overlay // The camera overlay being added to camera view
	});
};

// Click event to show the camera
open_camera.addEventListener("click", function(e) {
	openCamera();
});
