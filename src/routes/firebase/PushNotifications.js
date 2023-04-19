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

export async function sendDriverAcceptedNotifcation(){
  LocalNotifications.schedule({
    notifications: [{
        title: 'Driver Found!',
        body: 'A driver has accepted your ride and is on the way.',
        id: 2
      }
    ]
  })
}

export async function sendPassengerAvailableNotifcation(){
  LocalNotifications.schedule({
    notifications: [{
        title: 'Passenger found!',
        body: 'A passenger has requested a ride, would you like to accept?',
        id: 3
      }
    ]
  })
}

export async function sendDriverArrivedNotifcation(){
  LocalNotifications.schedule({
    notifications: [{
        title: 'Your driver is here!',
        body: 'Please meet your driver at the intended pickup location',
        id: 2
      }
    ]
  })
}