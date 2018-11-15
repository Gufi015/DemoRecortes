var myView = Ti.UI.createView();
var curBtn = Ti.UI.createButton({
	color : '#000000',
	title : 'Select Photo',
	height : 'auto',
	width : 'auto',
	top : 10
});

var imageView = Ti.UI.createImageView({
	width : '350dp',
	height : '280dp ',
	backgroundColor : '#ccc'
});
myView.add(curBtn);
myView.add(imageView);

var btnfoto = Ti.UI.createButton({
	title : 'Foto',
	left : 10,
	bottom : 10,
});
$.index.add(btnfoto);

btnfoto.addEventListener('click', function() {
	if (!Ti.Media.hasCameraPermissions()) {
		Ti.Media.requestCameraPermissions(function(e) {
			if (e.success) {
				//function
				abrirCamara();
			} else {
				alert('no se puede optener permisos de la camara');
			}
		});
	} else {
		//funcion
		abrirCamara();
	}
});

function abrirCamara() {
	Ti.Media.showCamera({
		success : function(event) {
			var intent = Ti.Android.createIntent({
				action : "com.android.camera.action.CROP",
				data : event.media.nativePath,
				type : 'image/*'
			});

			//investigar esto
			intent.putExtra("outputX", 300);
			intent.putExtra("outputY", 300);
			intent.putExtra("aspectX", 0);
			intent.putExtra("aspectY", 0);
			intent.putExtra("scale", true);
			intent.putExtra("return-data", true);

			var activity = $.index.getActivity();
			activity.startActivityForResult(intent, function(param) {
				if (param.resultCode == Ti.Android.RESULT_OK) {
					if (param.intent) {
						alert('Ok');
						var imageData = param.intent.getBlobExtra("data");
						imageView.image = imageData;
						imageView.width = '350dp';
						imageView.height = '280dp';

					}
				}
			});
		},
		cancel : function(e) {
		},
		error : function(e) {
			alert('ERROR IN ' + e.error);
		}
	});
}

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

			//investigar esto
			intent.putExtra("outputX", 300);
			intent.putExtra("outputY", 300);
			intent.putExtra("aspectX", 0);
			intent.putExtra("aspectY", 0);
			intent.putExtra("scale", true);
			intent.putExtra("return-data", true);

			var activity = $.index.getActivity();
			activity.startActivityForResult(intent, function(param) {
				if (param.resultCode == Ti.Android.RESULT_OK) {
					if (param.intent) {
						alert('Ok');
						var imageData = param.intent.getBlobExtra("data");
						imageView.image = imageData;
						imageView.width = '350dp';
						imageView.height = '280dp';

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
$.index.open();
