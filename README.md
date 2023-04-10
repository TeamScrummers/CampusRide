To install firebase SDK to app:
    npm install firebase

    -Firestore needs the following dependencies
        npm install firebase-admin --save


To Run App:
npm install
npm run dev


Dependency

	Capacitor:
		Run the following commands in the desired project directory:
			npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/local-notifications
			npx cap init
				web asset directory: build (everything can be left as default or select yes)

		You may have to run "npm audit fix" to fix depreciated svelte dependencies

To build the project

	npm run build
	npx cap sync


For Testing, download Android Studio. Once downloaded, run:
	For Linux:
		npx cap open android