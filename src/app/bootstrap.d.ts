declare module 'bootstrap' {
  export class Modal {
    constructor(element: Element | string, options?: any);
    static getInstance(element: Element | string): Modal | null;
    show(): void;
    hide(): void;
    dispose(): void; // needed to remove backdrop
  }
}
