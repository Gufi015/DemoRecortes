//var image = require("/bigimage");

// var myImageView = Ti.UI.createImageView({
// width : 350,
// height : 290,
// borderColor : 'blue',
// });
// $.index.add(myImageView);
//
// var btnFoto = Ti.UI.createButton({
// title : 'Take a Photo',
// left : 10,
// bottom : 10,
// });
// $.index.add(btnFoto);
// btnFoto.addEventListener('click', function(e) {
// if (!Ti.Media.hasCameraPermissions()) {
// Ti.Media.requestCameraPermissions(function(e) {
// if (e.success) {
// abrirCamara();
// } else {
// alert('No se pudo optener permisos de la camara');
// }
// });
// }else{
// abrirCamara();
// }
//
// });
//
// function abrirCamara() {
// Ti.Media.showCamera({
// success : function(e) {
// myImageView.image = image.crop(e.media, myImageView.rect);
// },
// cancel : function(e) {
//
// },
// error : function(error) {
// alert('Error' + error.code);
// }
// });
// }

// var takePic = Ti.UI.createButton({
// title 	: "Take picture",
// width 	: "90%",
// height 	: 40,
// top 	: 0,
// }),
// currPic = null,
// imageView = null;
//
// function abrirCamara() {
// Titanium.Media.showCamera({
// success:function(event)
// {
// var image = event.media;
// currPic = image;
// imageView = Titanium.UI.createImageView({
// image: currPic,
// top: 4,
// left: 4,
// width: 400,
// height: 400,
// });
// btnTransform.enabled = true;
// $.index.add(imageView);
// },
// cancel:function()
// {
// },
// error:function(error)
// {
// },
// // saveToPhotoGallery:false,
// // mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
// });
// };
//
// takePic.addEventListener("click",function(e) {
// if (!Ti.Media.hasCameraPermissions()) {
// Ti.Media.requestCameraPermissions(function(e) {
// if (e.success) {
// abrirCamara();
// } else {
// alert('No se pudo optener permisos de la camara');
// }
// });
// }else{
// abrirCamara();
// }
// });
//
// $.index.add(takePic);
//
// var ImageFactory = require('ti.imagefactory');
//
// var btnTransform = Titanium.UI.createButton({
// title: 'Crop with ImageFactory',
// bottom: 4, left: 125,
// width: '40%', height: 60,
// enabled:false
// });
//
// btnTransform.addEventListener('click', function (e) {
// if (currPic != null) {
// Ti.API.info("Cropped!");
// var newBlob = ImageFactory.imageAsCropped(currPic,{ width:currPic.width, height:currPic.height, x:0, y:0 });
// imageView.image = newBlob;
// imageView.size = { width:newBlob.width, height:newBlob.height };
// }
// });
//
// $.index.add(btnTransform);

var myView = Ti.UI.createView();

var curBtn = Ti.UI.createButton({
	color : '#000000',
	title : 'Select Photo',
	height : 'auto',
	width : 'auto',
	top : 10
});

var imageView = Ti.UI.createImageView({
	width : 200,
	height : 200,
	backgroundColor : '#ccc'
});
myView.add(curBtn);
myView.add(imageView);

curBtn.addEventListener('click', function(e) {
	if (!Titanium.Filesystem.hasStoragePermissions()) {
		Titanium.Filesystem.requestStoragePermissions(function(e) {
			if (e.success) {
				openPhotoGallery();
			} else {
				alert("Need permissions");
			};
		});
	} else {
		openPhotoGallery();
	}
});

function openPhotoGallery() {
	Ti.Media.openPhotoGallery({
		success : function(event) {
			var intent = Ti.Android.createIntent({
				action : "com.android.camera.action.CROP",
				data : event.media.nativePath,
				type : 'image/*'
			});

			intent.putExtra("outputX", 200);
			intent.putExtra("outputY", 200);
			intent.putExtra("aspectX", 1);
			intent.putExtra("aspectY", 1);
			intent.putExtra("scale", true);
			intent.putExtra("return-data", true);

			var activity = $.index.getActivity();
			activity.startActivityForResult(intent, function(param) {
				if (param.resultCode == Ti.Android.RESULT_OK) {
					if (param.intent) {
						alert('Ok');
						var imageData = param.intent.getBlobExtra("data");
						imageView.image = imageData;

					}
				}
			});
		},
		error : function(error) {
			// error...
		},
		cancel : function() {
			// cancel...
		}
	});

};
$.index.add(myView);

// var orignal = Titanium.UI.createImageView({
// width : Ti.UI.SIZE,
// height : Ti.UI.SIZE,
// left : 5
// });
//
// var ImageView = Titanium.UI.createImageView({
// width : 200,
// height : 200
//
// });
// var cropView = Titanium.UI.createView({
// top : 10,
// width : 150,
// height : 150,
// borderColor : 'lime',
// borderWidth : 1,
// zIndex : 1,
// left : 150
// });
//
// var button = Ti.UI.createButton({
// bottom : 30,
// width : 60,
// title : 'CROP',
// zIndex : 1,
// });
//
// $.index.add(button);
//
// var CropedImageView = Titanium.UI.createImageView({
// top : 200,
// width : cropView.width,
// height : cropView.height,
// left : 150
// });
//
// button.addEventListener('click', function(e) {
// cropView.borderColor = 'transparent';
// CropedImageView.image = cropView.toImage();
// $.index.add(CropedImageView);
//
// Ti.Media.openPhotoGallery({
// success : function(e) {
// ImageView.image = e.media;
// orignal.image = e.media;
// cropView.add(ImageView);
// $.index.add(cropView);
// $.index.add(orignal);
// },
// });
// });
//
// function openCamera() {
// var transform = Ti.UI.create2DMatrix();
// // transform is iOS only, ignored on Android
// transform = transform.scale(1);
// var overlay = getCameraOverlay();
// // code is below
// Titanium.Media.showCamera({
// success : function(event) {
// var image = event.media;
// if (OS_ANDROID) {
// var cropRect = event.cropRect;
// Titanium.API.info('PHOTO CAMERA SUCCESS type: ' + image.mimeType + ' cropRect.x ' + cropRect.x + ' cropRect.y ' + cropRect.y + ' cropRect.height ' + cropRect.height + ' cropRect.width ' + cropRect.width);
//
// // set image view
// Ti.API.debug('Our type was: ' + event.mediaType);
// if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
// cropFromCamera(image, cropRect.height, cropRect.width);
// }
//
// } else {// ios cropFromCamera(image, null, null); }
//
// }, cancel : function() {
// },
// error : function(error) {
// },
// saveToPhotoGallery : false,
// overlay : overlay,
// transform : transform,
// autorotate : false,
// // allowEditing and mediaTypes are iOS-only settings
// allowEditing : false,
// showControls : false,
// mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
// });
// }
//
// function getCameraOverlay() {
// var displayWidth = Ti.Platform.displayCaps.platformWidth;
// var displayHeight = Ti.Platform.displayCaps.platformHeight;
// var camera = "rear";
// var viewsHeight = (displayHeight - displayWidth) / 2;
// var photoViewDim = displayWidth;
// if (OS_ANDROID) {
// var viewsHeight = viewsHeight + "px";
// var photoViewDim = displayWidth + "px";
// }
//
// // setup overlay
// var overlay = Ti.UI.createView({
// width : Ti.UI.FILL,
// height : Ti.UI.FILL,
// backgroundColor : "transparent",
// layout : "vertical"
// });
//
// var header = Ti.UI.createView({
// width : Ti.UI.FILL,
// height : viewsHeight,
// top : 0,
// backgroundGradient : Alloy.Globals.gradientBackgroundHorizontal,
// layout : "vertical"
// });
//
// var backClickableView = Ti.UI.createView({
// width : "55dp",
// height : "35dp",
// backgroundColor : "transparent",
// left : 0,
// zIndex : 1,
// top : "3dp"
// });
//
// var backArrow = Ti.UI.createImageView({
// image : "/img/elements/back.png",
// width : "10dp",
// height : "auto",
// left : "5dp",
// touchEnabled : false
// });
//
// var appLogo = Ti.UI.createView(
// { left : "20dp", // 31x35 fits the image width : "31dp", height : "35dp", backgroundImage : "/img/logo_white_little.png", touchEnabled : false }
//
// );
//
// backClickableView.add(backArrow);
// backClickableView.add(appLogo);
// backClickableView.addEventListener('click', function() {
// Titanium.Media.hideCamera();
// });
// backClickableView.addEventListener('touchstart', function() {
// backClickableView.setOpacity(0.5);
// backClickableView.setBackgroundColor("white");
// });
// backClickableView.addEventListener('touchend', function() {
// backClickableView.setOpacity(1);
// backClickableView.setBackgroundColor("transparent");
// });
// header.add(backClickableView);
//
// var photoView = Ti.UI.createView({
// width : photoViewDim,
// height : photoViewDim,
// backgroundColor : "transparent",
// touchEnabled : false
// });
//
// var optionBar = Ti.UI.createView({
// top : "3dp",
// width : Ti.UI.FILL,
// height : Ti.UI.FILL,
// bottom : 0,
// backgroundColor : "black"
// });
//
// var switchCameraBtn = Ti.UI.createButton({
// width : "37dp",
// height : "37dp",
// backgroundImage : "/img/btn/switch_camera.png"
// });
// switchCameraBtn.addEventListener('click', function() {
// if (camera == "rear") {
// Titanium.Media.switchCamera(Titanium.Media.CAMERA_FRONT);
// camera = "front";
// } else {
// Titanium.Media.switchCamera(Titanium.Media.CAMERA_REAR);
// camera = "rear";
// }
//
// });
// var startFlashImage = "/img/btn/flash_auto.png";
// switch(Titanium.Media.cameraFlashMode) {
// case Titanium.Media.CAMERA_FLASH_OFF:
// Titanium.Media.setCameraFlashMode(Titanium.Media.CAMERA_FLASH_AUTO);
// startFlashImage = "/img/btn/flash_off.png";
// break;
// case Titanium.Media.CAMERA_FLASH_ON:
// Titanium.Media.setCameraFlashMode(Titanium.Media.CAMERA_FLASH_OFF);
// startFlashImage = "/img/btn/flash_on.png";
// break;
// default:
// break;
// }
//
// var flashBtn = Ti.UI.createButton({
// width : "35dp",
// height : "35dp",
// backgroundImage : startFlashImage,
// right : "10dp"
// });
// flashBtn.addEventListener('click', function() {
// switch(Titanium.Media.cameraFlashMode) {
// case Titanium.Media.CAMERA_FLASH_AUTO:
// Titanium.Media.setCameraFlashMode(Titanium.Media.CAMERA_FLASH_ON);
// flashBtn.backgroundImage = "/img/btn/flash_on.png";
// break;
// case Titanium.Media.CAMERA_FLASH_OFF:
// Titanium.Media.setCameraFlashMode(Titanium.Media.CAMERA_FLASH_AUTO);
// flashBtn.backgroundImage = "/img/btn/flash_auto.png";
// break;
// case Titanium.Media.CAMERA_FLASH_ON:
// Titanium.Media.setCameraFlashMode(Titanium.Media.CAMERA_FLASH_OFF);
// flashBtn.backgroundImage = "/img/btn/flash_off.png";
// break;
// }
//
// });
// optionBar.add(switchCameraBtn);
// optionBar.add(flashBtn);
//
// var takePictureView = Ti.UI.createView({
// width : Ti.UI.FILL,
// height : viewsHeight,
// backgroundColor : "black"
// });
// takePictureView.addEventListener('click', function() {
// Titanium.Media.takePicture();
// });
// var takePictureBtn = Ti.UI.createImageView({
// width : "auto",
// height : Ti.UI.FILL,
// image : "/img/btn/camera_icon_white.png",
// top : "10dp",
// bottom : "10dp",
// touchEnabled : false
// });
// takePictureView.add(takePictureBtn);
// header.add(optionBar);
// overlay.add(header);
// overlay.add(photoView);
// overlay.add(takePictureView);
//
// return overlay;
// }

// var OpenCamera = Ti.UI.createButton({
// backgroundColor : '#ff0000',
// title : 'Open Camera',
// color : '#fff',
// width : Ti.UI.SIZE,
// height : Ti.UI.SIZE,
// top : 10
// });
//
// OpenCamera.addEventListener('click', function() {
// fireUpTheCamera();
// });
// $.index.add(OpenCamera);
//
// var anImageView = Ti.UI.createImageView({
// width : Ti.UI.FILL,
// height : Ti.UI.FILL,
// top : 10,
// autorotate : true,
// borderColor: 'red'
// });
//
// $.index.add(anImageView);
// var overlay = Ti.UI.createView({
// width : 50,
// height : 50,
// });
//
// // Create an ImageView.
// var overlayImg = Ti.UI.createImageView({
// //image : '/appicon.png',
// width : 350,
// height : 350,
// borderColor: 'red',
// autorotate : true,
// });
//
// overlayImg.addEventListener('click', function() {
// //Ti.Media.takePicture();
// fireUpTheCamera();
// });
// overlay.add(overlayImg);
//
// function fireUpTheCamera() {
// Titanium.Media.showCamera({
// success : function(event) {
// var cropRect = event.cropRect;
// var image = event.media;
// Ti.API.debug('Our type was: ' + event.mediaType);
// if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
// anImageView.image = image;
// //new_upload_profile_picture_update(anImageView.image);
// } else {
// alert("got the wrong type back =" + event.mediaType);
// }
// },
// cancel : function() {
// },
// error : function(error) {
// // create alert
// var a = Titanium.UI.createAlertDialog({
// title : 'Camera'
// });
// // set message
// if (error.code == Titanium.Media.NO_CAMERA) {
// a.setMessage('Please run this test on device');
// } else {
// a.setMessage('Unexpected error: ' + error.code);
// }
// // show alert
// a.show();
// },
// //saveToPhotoGallery : true,
// //allowEditing : false,
// overlay : overlay,
// //mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
// });
// }

$.index.open();
