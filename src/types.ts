export interface School {
  id: string;
  name: string;
  location: string;
  description: string;
  headmasterName: string;
  imageUrl?: string;
}

export interface Need {
  id: string;
  schoolId: string;
  title: string;
  description: string;
  category: 'Infrastructure' | 'Books' | 'Water' | 'Sports' | 'Other';
  costEstimate: number;
  collectedAmount: number;
  status: 'Open' | 'In Progress' | 'Fulfilled';
  beforeImageUrl?: string;
  afterImageUrl?: string;
  createdAt: string;
}

export interface Pledge {
  id: string;
  needId: string;
  donorId: string;
  donorName: string;
  amount: number;
  pledgeType: 'Funds' | 'Items';
  message?: string;
  timestamp: string;
}
