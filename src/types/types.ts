type User = {
  name: string;
  email: string;
  password: string;
};

type Subscription = {
  title: string;
  desc: string;
  createdAt: Date;
};

export type { User, Subscription };
