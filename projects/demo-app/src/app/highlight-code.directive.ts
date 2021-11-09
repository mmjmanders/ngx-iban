import { AfterViewInit, Directive, ElementRef, OnInit } from "@angular/core";
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import xml from "highlight.js/lib/languages/xml";
import typescript from "highlight.js/lib/languages/typescript";

@Directive({
  selector: "code[highlight]"
})
export class HighlightCodeDirective implements OnInit, AfterViewInit {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    hljs.registerLanguage("bash", bash);
    hljs.registerLanguage("html", xml);
    hljs.registerLanguage("typescript", typescript);
  }

  ngAfterViewInit() {
    hljs.highlightElement(this.el.nativeElement);
  }
}
