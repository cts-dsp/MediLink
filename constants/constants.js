const dailyTips = [
  "💧 Stay hydrated—drink at least 8 glasses of water daily.",
  "😴 Get 7-9 hours of quality sleep every night for better health.",
  "🥗 Eat a balanced diet with plenty of fruits, vegetables, and lean proteins.",
  "🚶‍♂️ Walk at least 10,000 steps a day to stay active and boost circulation.",
  "🧘‍♀️ Practice deep breathing or meditation to reduce stress levels.",
  "🦷 Brush and floss your teeth twice daily to maintain oral health.",
  "🩸 Monitor your blood pressure regularly to catch early warning signs.",
  "🌞 Apply sunscreen daily to protect your skin from UV damage.",
  "🏋️ Exercise at least 30 minutes a day to keep your body strong.",
  "🛏 Avoid screens before bedtime to improve sleep quality.",
  "🍎 Limit sugar and processed food intake to maintain energy levels.",
  "🖥️ Take breaks from screens every 20 minutes to reduce eye strain.",
  "🤝 Wash your hands frequently to prevent infections.",
  "💉 Keep up with vaccinations and regular health check-ups.",
  "🚑 Learn basic first-aid skills for handling emergencies.",
  "🦴 Maintain good posture to prevent back and neck pain.",
  "🚰 Avoid sugary drinks—opt for water or herbal tea instead.",
  "📅 Set reminders for medication to stay on track with prescriptions.",
  "🚴‍♀️ Engage in outdoor activities like cycling or jogging for fresh air.",
  "🏥 Know the location of the nearest hospital or urgent care center.",
  "📉 Track your fitness and health data using a wearable device.",
  "🥄 Use smaller plates to help with portion control and mindful eating.",
  "🤯 Take mental health breaks to avoid burnout and fatigue.",
  "🧴 Use hand sanitizer when soap and water aren't available.",
  "📲 Store emergency contacts in your phone for quick access.",
  "🛑 Avoid self-diagnosing—consult a doctor for medical advice.",
  "🌿 Try natural remedies like ginger or turmeric for mild ailments.",
  "🚮 Dispose of expired medicines properly—don’t flush them.",
  "🔋 Get regular health screenings based on your age and risk factors.",
  "🔊 Listen to your body—don't ignore persistent pain or discomfort.",
  "🛠 Keep a basic first-aid kit at home and in your car.",
  "🏡 Make time for hobbies and relaxation to maintain mental well-being.",
];

export const getDailyTip = (tip) => {
  const today = new Date().getDate() % dailyTips.length;
  if (tip === 0) return dailyTips[today];

  return dailyTips[tip];
};

export const FIRST_AID_LIST = [
  {
    title: "Stopped Heart",
    image:
      "https://www.verywellhealth.com/thmb/EiHS9rCIq-hQJehIKP2Se8ioEDE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-505252032-56d1ec685f9b5879cc81553d.jpg",
    description:
      "CPR and AEDs are crucial in cardiac arrest situations. Chest compressions and rescue breathing can help recirculate blood until medical help arrives.",

    steps: [
      "Call 911 and seek help.",
      "Start chest compressions: push hard and fast in the center of the chest.",
      "Continue until medical help arrives.",
      "Use an AED if available but do not delay chest compressions to look for one.",
    ],
    youtubeLink: "qvf_74DM880",
  },
  {
    title: "Bleeding",
    image:
      "https://www.verywellhealth.com/thmb/S7Pp-oYhwU-A86gseGC41RDFM24=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-525386797-5a6a1eccfa6bcc003690b97f.jpg",
    description:
      "Control bleeding by applying direct pressure and keeping the wound elevated. Identifying the type of bleeding (capillary, venous, arterial) helps determine severity.",

    steps: [
      "Wear gloves if available.",
      "Rinse the wound with water.",
      "Apply direct pressure with a clean cloth.",
      "Do not remove soaked cloth; add layers instead.",
      "Seek medical help if bleeding is severe or does not stop.",
    ],
    youtubeLink: "qrbiUlcUZn0",
  },
  {
    title: "Choking",
    image:
      "https://www.verywellhealth.com/thmb/OvYCTOPiSh8Kldk3o1yhd475280=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-136811278-664fedac86fc431d84ab156fdfeda4e4.jpg",
    description:
      "Choking blocks the airway and can be life-threatening. The Heimlich maneuver can help dislodge the object.",
    youtubeLink: "ClprR0PJco0",

    steps: [
      "Ask if the person is choking.",
      "Stand behind them and wrap arms around their waist.",
      "Perform quick, upward thrusts below the rib cage.",
      "Repeat until object is dislodged.",
      "If the person becomes unconscious, perform abdominal thrusts while they lie on their back.",
    ],
  },
  {
    title: "Burns",
    image:
      "https://www.verywellhealth.com/thmb/kkbt6ABHO51uhwxndw_i06VDV7U=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/woman-washing-hands-in-washstand-882017214-5b57492cc9e77c003756d31c.jpg",
    description:
      "Burns should be cooled immediately. Their severity is classified as first, second, or third-degree burns.",
    youtubeLink: "XJGPzl3ENKo",

    steps: [
      "Stop the burning process (remove heat, chemicals, or electricity).",
      "Flush the burn with cool running water.",
      "Apply a light gauze bandage.",
      "Do not break blisters.",
      "Seek medical attention for severe burns.",
    ],
  },
  {
    title: "Blisters",
    image:
      "https://www.verywellhealth.com/thmb/lLnelPqIeQFTS_oD39xZ7LpqBBg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/cropped-hand-of-man-applying-adhesive-bandage-on-ankle-1187311628-5b58a1be0a874e0586204d6b85ea8c55.jpg",
    description:
      "Blisters protect damaged skin. Some should be left alone, while others need treatment.",
    youtubeLink: "Vm2TXMNPbn0",

    steps: [
      "Do not pop small blisters.",
      "For large blisters, sterilize a needle and drain fluid gently.",
      "Apply antibiotic ointment and cover with a bandage.",
      "If a blister breaks, clean with water, apply petroleum jelly, and bandage.",
      "Seek medical help if there are signs of infection.",
    ],
  },
  {
    title: "Broken Bones or Fractures",
    image:
      "https://www.verywellhealth.com/thmb/FghcEkbxf0Y86pejnhe8JTN7i7Q=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/woman-sitting-with-ice-pack-on-knee-146276242-577c320f3df78cb62c9009cf.jpg",
    description:
      "Broken bones need stabilization. Emergency care is required for severe fractures.",
    youtubeLink: "pJl3zhBRl9A",

    steps: [
      "Call 911 for severe injuries.",
      "Do not move a suspected spinal or severe fracture injury.",
      "Use a splint and padding for support.",
      "Apply a cold pack (not directly on skin).",
      "Seek medical attention promptly.",
    ],
  },
  {
    title: "Sprains",
    image:
      "https://www.verywellhealth.com/thmb/0iJh87uRaQITu19iMobpp27N1gg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-580815229-56b05b583df78cf772ce6891.jpg",
    description:
      "Sprains occur when ligaments are overstretched. Treatment focuses on reducing swelling and pain.",
    youtubeLink: "yrvqNh2q6Tc",

    steps: [
      "Rest the injured area.",
      "Apply a cold pack.",
      "Elevate the limb if possible.",
      "Use anti-inflammatory medication for pain.",
      "Seek medical help if symptoms worsen or do not improve.",
    ],
  },
  {
    title: "Nosebleeds",
    image:
      "https://www.verywellhealth.com/thmb/bTKh8ZUdGQNYoG5pQFDTOvbvkhM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-565976469-570285db3df78c7d9e6d8feb.jpg",
    description:
      "Nosebleeds can be caused by trauma, dry air, or medical conditions. Stopping the bleeding promptly is key.",
    youtubeLink: "opUZX8f0wgA",

    steps: [
      "Lean slightly forward (not back).",
      "Pinch just below the bridge of the nose.",
      "Apply a cold pack to the bridge of the nose.",
      "Check after 5 minutes; if bleeding continues, repeat for another 10 minutes.",
      "Seek emergency care if bleeding persists beyond 15 minutes.",
    ],
  },
  {
    id: 9,
    title: "Frostbite",
    image:
      "https://www.verywellhealth.com/thmb/-30zOJlGjv9lPktFu7Zqy26YSWc=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-912082062-5c021fc446e0fb0001febdff.jpg",
    description:
      "Frostbite happens when the body's tissues freeze deeply in the cold. This is the opposite of a burn, but the damage it does to your skin is almost the same.",
    youtubeLink: "e3eimijVeLw",

    steps: [
      "Get out of the cold.",
      "Put the affected area in warm water (98 to 105 degrees) for 20 to 30 minutes.",
      "Do not rub the affected area.",
      "Do not use sources of dry heat (e.g., heating pads, fireplace).",
      "For fingers and toes, you can put clean cotton balls between them after they have warmed up.",
      "Loosely wrap the area with bandages.",
      "Use Tylenol (acetaminophen) or Advil (ibuprofen) for pain.",
      "Get medical attention as soon as possible.",
      "For small areas of minor frostbite, you can also warm the area with skin-to-skin contact (putting your skin on someone else's).",
      "Get emergency treatment if the skin is hard and begins turning white.",
    ],
  },
  {
    id: 10,
    title: "Bee Stings",
    image:
      "https://www.verywellhealth.com/thmb/K4IVi_PVtHmfKEqtj14YF3n3OhI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-184988794-570278d83df78c7d9e6c1244.jpg",
    description:
      "Bee stings can hurt a lot but are only a minor problem for many people. However, for people who are allergic to bee venom, a sting can be deadly.",
    signsOfAllergy: [
      "Swelling away from the area that was stung",
      "Flushing",
      "Hives (raised, large red or skin-colored bumps)",
      "Itching",
      "Signs of anaphylaxis (hives, swelling, chest pain, confusion, sweating, blue lips and nails, trouble breathing)",
    ],
    youtubeLink: "i9nzD1BG2o0",

    steps: [
      "Call 911 immediately or get the person to the hospital if they have signs of an allergic reaction.",
      "If the person has a known allergy to bee stings, use an EpiPen to prevent anaphylaxis.",
      "Get the stinger out immediately using a straight-edged object like a credit card. Avoid squeezing the venom sac with tweezers or fingers.",
      "Wash the area with soap and water.",
      "Use a cold pack to help with swelling; do not apply ice directly to the skin.",
      "Use an allergy medication or antihistamine (like Benadryl) to reduce swelling and itching.",
      "Use Tylenol (acetaminophen) or Advil (ibuprofen) for pain.",
    ],
  },
];
export const mapsStyles = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#181818",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1b1b1b",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#2c2c2c",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8a8a8a",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#373737",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#3c3c3c",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#4e4e4e",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3d3d3d",
      },
    ],
  },
];
