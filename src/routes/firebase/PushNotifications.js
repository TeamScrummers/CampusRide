import {LocalNotifications} from "@capacitor/local-notifications"

export async function sendTheUserAPushNotifcation(){
  LocalNotifications.schedule({
    notifications: [{
        title: 'Friendly Reminder',
        body: 'Join Team Scrummers :D',
        id: 1
      }
    ]
  })
}