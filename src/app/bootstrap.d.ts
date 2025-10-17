/*
This block is a type declaration, not executable code.
It tells TypeScript:

“Hey, there’s a module called 'bootstrap', and it exports a class named Modal with these methods (show(), hide(), dispose(), etc.).”

So you’re basically giving TypeScript a description of what the Bootstrap Modal class looks like. 
*/
declare module 'bootstrap' {
  export class Modal {
    constructor(element: Element | string, options?: any);
    static getInstance(element: Element | string): Modal | null;
    show(): void;
    hide(): void;
    // dispose(): void; // needed to remove backdrop
  }
}
