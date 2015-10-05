  
module.exports = {

  groupedFreeSlotList : {
     "slots":[
        {
           "start":new Date("2015-10-09T19:00:00.000Z"),
           "end":new Date("2015-10-09T20:00:00.000Z"),
           "id":1444417200000,
           "calendarIds":[
              "medallia.com_3339353632343333323839@resource.calendar.google.com",
              "medallia.com_3436313935323233373333@resource.calendar.google.com",
              "medallia.com_2d3933373537323832363530@resource.calendar.google.com",
              "medallia.com_2d3433363032372d363939@resource.calendar.google.com"
           ]
        },
        {
           "start":new Date("2015-10-09T23:00:00.000Z"),
           "end":new Date("2015-10-10T00:00:00.000Z"),
           "id":1444431600000,
           "calendarIds":[
              "medallia.com_3339353632343333323839@resource.calendar.google.com"
           ]
        },
        {
           "start":new Date("2015-10-09T21:00:00.000Z"),
           "end":new Date("2015-10-09T22:00:00.000Z"),
           "id":1444424400000,
           "calendarIds":[
              "medallia.com_3436313935323233373333@resource.calendar.google.com"
           ]
        },
        {
           "start":new Date("2015-10-09T19:30:00.000Z"),
           "end":new Date("2015-10-09T20:30:00.000Z"),
           "id":1444419000000,
           "calendarIds":[
              "medallia.com_2d3933373537323832363530@resource.calendar.google.com"
           ]
        },
        {
           "start":new Date("2015-10-10T00:00:00.000Z"),
           "end":new Date("2015-10-10T01:00:00.000Z"),
           "id":1444435200000,
           "calendarIds":[
              "medallia.com_2d3338303236343538383037@resource.calendar.google.com"
           ]
        },
        {
           "start":new Date("2015-10-10T00:30:00.000Z"),
           "end":new Date("2015-10-10T01:30:00.000Z"),
           "id":1444437000000,
           "calendarIds":[
              "medallia.com_2d3338303236343538383037@resource.calendar.google.com"
           ]
        },
        {
           "start":new Date("2015-10-09T18:30:00.000Z"),
           "end":new Date("2015-10-09T19:30:00.000Z"),
           "id":1444415400000,
           "calendarIds":[
              "medallia.com_2d3433363032372d363939@resource.calendar.google.com"
           ]
        }
     ],
     "resources":[
        {
           "kind":"calendar#calendarListEntry",
           "etag":"\"1444025801769000\"",
           "id":"medallia.com_3339353632343333323839@resource.calendar.google.com",
           "summary":"PA3-Portal (Polycom - seats 6)",
           "timeZone":"America/Los_Angeles",
           "colorId":"12",
           "backgroundColor":"#fad165",
           "foregroundColor":"#000000",
           "accessRole":"reader",
           "defaultReminders":[

           ]
        },
        {
           "kind":"calendar#calendarListEntry",
           "etag":"\"1444025802265000\"",
           "id":"medallia.com_3436313935323233373333@resource.calendar.google.com",
           "summary":"PA3-Russia (seats 6 casual)",
           "timeZone":"America/Los_Angeles",
           "colorId":"18",
           "backgroundColor":"#b99aff",
           "foregroundColor":"#000000",
           "accessRole":"reader",
           "defaultReminders":[

           ]
        },
        {
           "kind":"calendar#calendarListEntry",
           "etag":"\"1444025802911000\"",
           "id":"medallia.com_2d3933373537323832363530@resource.calendar.google.com",
           "summary":"PA3-South Africa (LifeSize - seats 10)",
           "timeZone":"America/Los_Angeles",
           "colorId":"13",
           "backgroundColor":"#92e1c0",
           "foregroundColor":"#000000",
           "accessRole":"reader",
           "defaultReminders":[

           ]
        },
        {
           "kind":"calendar#calendarListEntry",
           "etag":"\"1444025800020000\"",
           "id":"medallia.com_2d3338303236343538383037@resource.calendar.google.com",
           "summary":"PA3-Australia (LifeSize - seats 10)",
           "timeZone":"America/Los_Angeles",
           "colorId":"12",
           "backgroundColor":"#fad165",
           "foregroundColor":"#000000",
           "accessRole":"reader",
           "defaultReminders":[

           ]
        },
        {
           "kind":"calendar#calendarListEntry",
           "etag":"\"1444025800584000\"",
           "id":"medallia.com_2d3234373732353931383332@resource.calendar.google.com",
           "summary":"PA3-Mario (Polycom - seats 5)",
           "timeZone":"America/Los_Angeles",
           "colorId":"7",
           "backgroundColor":"#42d692",
           "foregroundColor":"#000000",
           "accessRole":"reader",
           "defaultReminders":[

           ]
        },
        {
           "kind":"calendar#calendarListEntry",
           "etag":"\"1444025801214000\"",
           "id":"medallia.com_2d3433363032372d363939@resource.calendar.google.com",
           "summary":"PA3-New Zealand (LifeSize - seats 10)",
           "timeZone":"America/Los_Angeles",
           "colorId":"7",
           "backgroundColor":"#42d692",
           "foregroundColor":"#000000",
           "accessRole":"reader",
           "defaultReminders":[

           ]
        }
     ]
  },

  freeBusyQuery : {
    "kind": "calendar#freeBusy",
    "timeMin": "2015-10-09T04:00:00.000Z",
    "timeMax": "2015-10-10T02:00:00.000Z",
    "calendars": {
      "PA3-Russia@resource.medallia.com": {
        "available": [{
         "start": "2015-10-09T16:45:00Z",
         "end": "2015-10-09T16:57:00Z"
        },
        {
         "start": "2015-10-09T17:15:00Z",
         "end": "2015-10-09T18:30:00Z"
        },
        {
         "start": "2015-10-09T23:00:00Z",
         "end": "2015-10-10T00:30:00Z"
        }],
        "taken": [{
         "start": "2015-10-09T16:45:00Z",
         "end": "2015-10-09T16:57:00Z",
         "eventId" : "3943493849"
        }]
      }
    }
  },

  calendarList : 
  [
    {
      "kind": "calendar#calendarListEntry",
      "etag": "\"1396354180678000\"",
      "id": "thorvald@medallia.com",
      "summary": "thorvald@medallia.com",
      "timeZone": "America/Los_Angeles",
      "colorId": "18",
      "backgroundColor": "#b99aff",
      "foregroundColor": "#000000",
      "accessRole": "freeBusyReader",
      "defaultReminders": []
    },
    {
      "kind": "calendar#calendarListEntry",
      "etag": "\"1441236039844000\"",
      "id": "davidv@medallia.com",
      "summary": "davidv@medallia.com",
      "timeZone": "America/Los_Angeles",
      "colorId": "18",
      "backgroundColor": "#b99aff",
      "foregroundColor": "#000000",
      "accessRole": "freeBusyReader",
      "defaultReminders": []
    },
    {
      "kind": "calendar#calendarListEntry",
      "etag": "\"1410803227208000\"",
      "id": "davidl@medallia.com",
      "summary": "davidl@medallia.com",
      "timeZone": "America/Los_Angeles",
      "colorId": "22",
      "backgroundColor": "#f691b2",
      "foregroundColor": "#000000",
      "accessRole": "freeBusyReader",
      "defaultReminders": []
    },
    {
      "kind": "calendar#calendarListEntry",
      "etag": "\"1392095466623000\"",
      "id": "cristian@medallia.com",
      "summary": "Cristian Rapagna",
      "timeZone": "America/Argentina/Buenos_Aires",
      "colorId": "12",
      "backgroundColor": "#fad165",
      "foregroundColor": "#000000",
      "accessRole": "freeBusyReader",
      "defaultReminders": []
    },
    {
      "kind": "calendar#calendarListEntry",
      "etag": "\"1441209409147000\"",
      "id": "medallia.com_3436313935323233373333@resource.calendar.google.com",
      "summary": "PA3-Russia (seats 6 casual)",
      "timeZone": "America/Los_Angeles",
      "colorId": "18",
      "backgroundColor": "#b99aff",
      "foregroundColor": "#000000",
      "accessRole": "reader",
      "defaultReminders": []
    },
    {
      "kind": "calendar#calendarListEntry",
      "etag": "\"1440451682978000\"",
      "id": "medallia.com_q2sqc2mv2gds0gineosuve8rac@group.calendar.google.com",
      "summary": "Eng - Cross Reporting Engineering",
      "description": "This calendar is primarily used to book your office hours with the Web and Mobile Reporting engineering team.",
      "timeZone": "America/Los_Angeles",
      "colorId": "19",
      "backgroundColor": "#c2c2c2",
      "foregroundColor": "#000000",
      "selected": true,
      "accessRole": "owner",
      "defaultReminders": []
    },
    {
      "kind": "calendar#calendarListEntry",
      "etag": "\"1415124094606000\"",
      "id": "farrah@medallia.com",
      "summary": "farrah@medallia.com",
      "timeZone": "America/Los_Angeles",
      "colorId": "11",
      "backgroundColor": "#fbe983",
      "foregroundColor": "#000000",
      "accessRole": "freeBusyReader",
      "defaultReminders": []
    },
    {
      "kind": "calendar#calendarListEntry",
      "etag": "\"1440451588463000\"",
      "id": "companyevents@medallia.com",
      "summary": "companyevents@medallia.com",
      "timeZone": "America/Los_Angeles",
      "colorId": "6",
      "backgroundColor": "#ffad46",
      "foregroundColor": "#000000",
      "selected": true,
      "accessRole": "reader",
      "defaultReminders": [
        {
          "method": "popup",
          "minutes": 10
        },
        {
          "method": "email",
          "minutes": 60
        }
      ]
    },
    {
      "kind": "calendar#calendarListEntry",
      "etag": "\"1410804206945000\"",
      "id": "corey@medallia.com",
      "summary": "corey@medallia.com",
      "timeZone": "America/Los_Angeles",
      "colorId": "11",
      "backgroundColor": "#fbe983",
      "foregroundColor": "#000000",
      "accessRole": "freeBusyReader",
      "defaultReminders": []
    },
    {
      "kind": "calendar#calendarListEntry",
      "etag": "\"1412357279972000\"",
      "id": "danw@medallia.com",
      "summary": "danw@medallia.com",
      "timeZone": "America/Los_Angeles",
      "colorId": "14",
      "backgroundColor": "#9fe1e7",
      "foregroundColor": "#000000",
      "accessRole": "freeBusyReader",
      "defaultReminders": []
    },
    {
      "kind": "calendar#calendarListEntry",
      "etag": "\"1414515533808000\"",
      "id": "mpodobnik@medallia.com",
      "summary": "mpodobnik@medallia.com",
      "timeZone": "America/Los_Angeles",
      "colorId": "23",
      "backgroundColor": "#cd74e6",
      "foregroundColor": "#000000",
      "accessRole": "reader",
      "defaultReminders": []
    },
    {
      "kind": "calendar#calendarListEntry",
      "etag": "\"1436303302082000\"",
      "id": "roberto@medallia.com",
      "summary": "roberto@medallia.com",
      "timeZone": "America/Los_Angeles",
      "colorId": "2",
      "backgroundColor": "#d06b64",
      "foregroundColor": "#000000",
      "accessRole": "freeBusyReader",
      "defaultReminders": []
    },
    {
      "kind": "calendar#calendarListEntry",
      "etag": "\"1440451537687000\"",
      "id": "tvo@medallia.com",
      "summary": "tvo@medallia.com",
      "location": "San Francisco",
      "timeZone": "America/Los_Angeles",
      "colorId": "19",
      "backgroundColor": "#c2c2c2",
      "foregroundColor": "#000000",
      "accessRole": "reader",
      "defaultReminders": []
    },
    {
      "kind": "calendar#calendarListEntry",
      "etag": "\"1440451638239000\"",
      "id": "medallia.com_b1s0tl86sbm4bsm0699qfhf26c@group.calendar.google.com",
      "summary": "Mind-allia (Psychological Wellness)",
      "description": "Calendar of events focusing on psychological wellness at Medallia...AKA Mind-allia!",
      "timeZone": "America/Los_Angeles",
      "colorId": "13",
      "backgroundColor": "#92e1c0",
      "foregroundColor": "#000000",
      "selected": true,
      "accessRole": "reader",
      "defaultReminders": []
    },
    {
      "kind": "calendar#calendarListEntry",
      "etag": "\"1440451593757000\"",
      "id": "medallia.com_c41glu7pvgh6ek488gpoudq0vs@group.calendar.google.com",
      "summary": "Candidate Visits",
      "timeZone": "America/Argentina/Cordoba",
      "colorId": "4",
      "backgroundColor": "#fa573c",
      "foregroundColor": "#000000",
      "selected": true,
      "accessRole": "owner",
      "defaultReminders": []
    },
    {
      "kind": "calendar#calendarListEntry",
      "etag": "\"1421719535188000\"",
      "id": "jmrodriguez@medallia.com",
      "summary": "jmrodriguez@medallia.com",
      "timeZone": "America/Los_Angeles",
      "colorId": "17",
      "backgroundColor": "#9a9cff",
      "foregroundColor": "#000000",
      "selected": true,
      "accessRole": "owner",
      "defaultReminders": [
        {
          "method": "popup",
          "minutes": 10
        }
      ],
      "notificationSettings": {
        "notifications": [
          {
            "type": "eventCreation",
            "method": "email"
          },
          {
            "type": "eventChange",
            "method": "email"
          },
          {
            "type": "eventCancellation",
            "method": "email"
          },
          {
            "type": "eventResponse",
            "method": "email"
          }
        ]
      },
      "primary": true
    },
    {
      "kind": "calendar#calendarListEntry",
      "etag": "\"1442341353268000\"",
      "id": "mattfysh@medallia.com",
      "summary": "mattfysh@medallia.com",
      "timeZone": "America/Los_Angeles",
      "colorId": "11",
      "backgroundColor": "#fbe983",
      "foregroundColor": "#000000",
      "accessRole": "freeBusyReader",
      "defaultReminders": []
    },
    {
      "kind": "calendar#calendarListEntry",
      "etag": "\"1440451662431000\"",
      "id": "medallia.com_nuqqnet3pspuglc6oh04j6mqjo@group.calendar.google.com",
      "summary": "Engineering Events & PTO",
      "description": "Events of engineering offsite & PTO tracking",
      "timeZone": "America/Los_Angeles",
      "colorId": "21",
      "backgroundColor": "#cca6ac",
      "foregroundColor": "#000000",
      "selected": true,
      "accessRole": "writer",
      "defaultReminders": []
    },
    {
      "kind": "calendar#calendarListEntry",
      "etag": "\"1440451685553000\"",
      "id": "#contacts@group.v.calendar.google.com",
      "summary": "Birthdays",
      "description": "Displays birthdays of people in Google Contacts and optionally 'Your Circles' from Google+. Also displays anniversary and other event dates from Google Contacts, if applicable.",
      "timeZone": "America/Los_Angeles",
      "colorId": "20",
      "backgroundColor": "#cabdbf",
      "foregroundColor": "#000000",
      "selected": true,
      "accessRole": "reader",
      "defaultReminders": []
    },
    {
      "kind": "calendar#calendarListEntry",
      "etag": "\"1440451598647000\"",
      "id": "en.ar#holiday@group.v.calendar.google.com",
      "summary": "Holidays in Argentina",
      "description": "Holidays and Observances in Argentina",
      "timeZone": "America/Los_Angeles",
      "colorId": "3",
      "backgroundColor": "#f83a22",
      "foregroundColor": "#000000",
      "selected": true,
      "accessRole": "reader",
      "defaultReminders": []
    },
    {
      "kind": "calendar#calendarListEntry",
      "etag": "\"1440451599331000\"",
      "id": "en.usa#holiday@group.v.calendar.google.com",
      "summary": "Holidays in United States",
      "description": "Holidays and Observances in United States",
      "timeZone": "America/Los_Angeles",
      "colorId": "7",
      "backgroundColor": "#42d692",
      "foregroundColor": "#000000",
      "selected": true,
      "accessRole": "reader",
      "defaultReminders": []
    }
  ]
  
};