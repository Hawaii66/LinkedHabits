type Slot = {
  name: string;
  description?: string;
};

type Habit = Slot & {
  image?: string;
};

type Trigger =
  | (Slot & {
      type: "Spot";
    })
  | {
      type: "Time";
      days: number[];
      time: number;
      name: string;
    };

type Reward = Slot & {};

type LinkedHabit = {
  name: string;
  trigger: Trigger;
  habits: Habit[];
  reward?: Reward;
};
