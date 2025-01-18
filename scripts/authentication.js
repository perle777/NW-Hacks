var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      var user = authResult.user;
      if (authResult.additionalUserInfo.isNewUser) {
        db.collection("users").doc(user.uid).set({
          name: user.displayName,
          email: user.email,
        }).then(function() {
          console.log("New user added to Firestore");
          window.location.assign("index.html");
        }).catch(function(error) {
          console.log("Error adding new user: ", error);
        });
        return false; // Prevent redirect if it's a new user
      } else {
        return true; // Redirect for existing users
      }
    },
    uiShown: function() {
      document.getElementById('loader').style.display = 'none';
    }
  },
  signInFlow: 'popup',
  signInSuccessUrl: "../dashboard/dashboard.html", // After successful login, redirect here
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ]
};

// Start Firebase UI
ui.start('#firebaseui-auth-container', uiConfig);