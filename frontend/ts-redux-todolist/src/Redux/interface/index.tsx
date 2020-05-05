export interface ActionIntf {
  type: string;
  id?: number;
  text?: string;
  filter?: string;
}

export interface TodoIntf {
  text: string;
  id: number;
  completed: boolean;
}
