// this is the complete list of currently supported params you can pass to the plugin (all optional) 
var options = {
  message: 'share this', // not supported on some apps (Facebook, Instagram) 
  subject: 'the subject', // fi. for email 
  files: ['', ''], // an array of filenames either locally or remotely 
  url: 'https://www.website.com/foo/#bar?a=b',
  chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title 
}
 
var onSuccess = function(result) {
  console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true 
  console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false) 
}
 
var onError = function(msg) {
  console.log("Sharing failed with message: " + msg);
}
 
window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);