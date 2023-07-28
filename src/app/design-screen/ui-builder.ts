import { Renderer2, RendererFactory2 } from '@angular/core';

abstract class UIComponent {
  html = '';
  css = {

  }

  children: UIComponent[] = [];

  public getHtml() {
    return this.html;
  }
  abstract parseValues(values: any): number;
  abstract getEditorHtml(): string;
  abstract getElement(): any;
  abstract apply(): void;
}

export class Paragraph extends UIComponent {
  #html = '<p> </p>';

  value = 'DEFAULT VALUE';
  element: any;
  constructor(private renderer: Renderer2) {
    super();
    this.element = renderer.createElement('p');
    renderer.addClass(this.element, 'editor-component');
    renderer.setProperty(this.element, 'innerHTML', this.value);
  }
  public override getHtml(): string {
    return `<p>${this.value}</p`;
  }
  public override parseValues(values: string): number {
    this.value = values;
    return 0;
  }
  public getEditorHtml() {
    return `<p class='editor-component'>${this.value}</p`;
  }
  public getElement() {
    return this.element;
  }
  public override apply(): void {
    this.renderer.setProperty(this.element, 'innerHTML', this.value);
    $(this.element).css(this.css)
  }
}

export class Button extends UIComponent {
  #html = '<button> </button>';

  value = 'Button';
  element: any;
  bootstrapBtnClass = "btn-primary"
  bootstrapPrevBtnClass = "btn-primary"
  constructor(private renderer: Renderer2) {
    super();
    this.element = renderer.createElement('button');
    renderer.addClass(this.element, 'editor-component');
    renderer.addClass(this.element, 'btn');
    renderer.addClass(this.element, 'btn-primary');
    renderer.setProperty(this.element, 'innerHTML', this.value);
  }
  public override getHtml(): string {
    return `<p>${this.value}</p`;
  }
  public override parseValues(values: string): number {
    this.value = values;
    return 0;
  }
  public getEditorHtml() {
    return `<p class='editor-component'>${this.value}</p`;
  }
  public getElement() {
    return this.element;
  }
  public override apply(): void {
    this.renderer.removeClass(this.element, this.bootstrapPrevBtnClass)
    this.renderer.addClass(this.element, this.bootstrapBtnClass)
    this.renderer.setProperty(this.element, 'innerHTML', this.value);
    $(this.element).css(this.css)
  }
}

export class UIBuilder {
  private components: UIComponent[] = [];
  constructor(private renderer: Renderer2, private document: Document) {}
  public addUIComponent(component: UIComponent) {
    this.components.push(component);
  }
  public parseHtml() {
    var html = '';
    for (let com of this.components) {
      html += com.getHtml();
    }
    return html;
  }
  public parseEditorHtml() {
    var html = '';
    for (let com of this.components) {
      html += com.getEditorHtml();
    }
    return html;
  }
  renderComponents(callback: any, object: any) {
    for (let com of this.components) {
      document.getElementById('renderHtml')!.appendChild(com.getElement());
      $(com.getElement()).unbind('click')
      $(com.getElement()).on('click', () => {
        callback(com, object);
      });
    }
  }
  insertWidget(widgetName: string): void {
    {
      switch (widgetName) {
        case 'Paragraph':
          this.addUIComponent(new Paragraph(this.renderer));
          break;
        case 'Button':
          this.addUIComponent(new Button(this.renderer));
          break;
      }
    }
  }
}
