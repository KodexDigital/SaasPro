export type NavChild = {
  label: string;
  path: string;
};

export type NavItem =
  | {
      label: string;
      icon: any; // lucide-react icon type (we can refine later)
      path: string;
      children?: never;
    }
  | {
      label: string;
      icon: any;
      children: NavChild[];
      path?: never;
    };