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
			
			//investigar esto
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
$.index.open();
