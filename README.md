# bookcase 📚 🤓
Toy project for experimenting with different React Native libraries.

### Debugging

The project was created with `create-react-native-app`. Use `npm start` from the `frontend/`
folder to start the development server. This will print a QR code and the instructions
in the terminal for scanning it with the Expo app.

You can also use `npm run ios` and `npm run android` for testing the app in the
Xcode and Android Studio simulators.

More detailed instructions can be found in [frontend/README.md](./frontend/README.md)

### Build the app for the App Store or Play Store

General information on how to eject the app can be found in the [create-react-native-app](https://github.com/react-community/create-react-native-app/blob/master/EJECTING.md)
repository.

#### Testing the app on a device

Detailed instructions can be found on the [Running On Device](https://facebook.github.io/react-native/docs/running-on-device.html#building-your-app-for-production) page.

For iOS, the release build can be created with the following command
`react-native run-ios --configuration Release`

For Android, a signed APK needs to generated. Instructions can be found on the [Generating Signed APK](https://facebook.github.io/react-native/docs/signed-apk-android.html) page.

##### Troubleshooting

Unrecognized font family Material Icons

Run `react-native link react-native-vector-icons`.
https://github.com/react-native-training/react-native-elements/issues/503

Configuring App Transport Security Exceptions
https://ste.vn/2015/06/10/configuring-app-transport-security-ios-9-osx-10-11/
