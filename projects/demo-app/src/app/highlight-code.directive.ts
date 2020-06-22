import { AfterViewInit, Directive, ElementRef } from "@angular/core";
import * as hljs from "highlight.js";

@Directive({
  selector: "code[highlight]"
})
export class HighlightCodeDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    hljs.highlightBlock(this.el.nativeElement);
  }
}
