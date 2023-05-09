import {LocalNotifications} from "@capacitor/local-notifications"


/**
 * Sends a push notification to the user's device.
 * @param {string} givenTitle - The title of the notif
 * @param {string} givenBody - The body text of the notif
 * @returns {Promise<void>} - Promise that resolves when the notification is delivered.
 */
export async function sendTheUserAPushNotifcation(givenTitle, givenBody){
  LocalNotifications.schedule({
    notifications: [{
        title: givenTitle,
        body: givenBody,
        id: 1
      }
    ]
  })
}