export const GetMockData = (): LinkedHabit[] => {
  return [
    {
      habits: [
        {
          name: "Wake up",
          image:
            "data:image/jpeg;base64,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",
        },
        {
          name: "Toilet",
        },
        {
          name: "Breakfast",
        },
        {
          name: "Empty clothes",
        },
        {
          name: "Run",
        },
        {
          name: "Shower",
        },
      ],
      name: "Morning",
      trigger: {
        type: "Time",
        name: "Wake up",
        time: 9 * 60,
        days: [0, 1, 2, 3, 4, 5, 6],
      },
      reward: {
        name: "Free time",
        description: "You deservere some free time, maybe program",
      },
    },
    {
      habits: [
        {
          name: "Change clothes",
        },
        {
          name: "Music",
        },
        {
          name: "Swim",
        },
        {
          name: "Close pool",
        },
        {
          name: "Change clothes",
        },
      ],
      name: "Swim",
      trigger: {
        type: "Spot",
        name: "Swim",
      },
      reward: {
        description: "Go grab a chocolate",
        name: "Candy",
      },
    },
    {
      habits: [
        {
          name: "Empty plasitcs",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTehTKlBxh_VUTFDKhDfrVihhDWioCcMuwKx0JJpiNOgvuvxZ_r35tTUJA8CwiHYnvwCNU&usqp=CAU",
        },
        {
          description: "Empty dishwaser",
          name: "Empty",
        },
        {
          description: "Fill dishwaser",
          name: "Fill",
        },
      ],
      name: "Kitchen",
      trigger: {
        type: "Spot",
        name: "See kitchen",
      },
    },
  ];
};
