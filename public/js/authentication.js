var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      var user = authResult.user;
      if (authResult.additionalUserInfo.isNewUser) {
        db.collection("users")
          .doc(user.uid)
          .set({
            name: user.displayName,
            email: user.email,
          })
          .then(function () {
            console.log("New user added to Firestore");
            window.location.assign("index.html");
          })
          .catch(function (error) {
            console.log("Error adding new user: ", error);
          });
      }
      window.location.assign("home.html");
      return false;
    },
    uiShown: function () {
      document.getElementById("loader").style.display = "none";
    },
  },
  signInFlow: "popup",
  signInSuccessUrl: "home.html",
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
};

ui.start("#firebaseui-auth-container", uiConfig);
