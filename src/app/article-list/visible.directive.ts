import {
  Directive,
  Output,
  EventEmitter,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: '[appVisible]',
})
export class VisibleDirective implements AfterViewInit, OnDestroy {
  @Output() public visible: EventEmitter<Boolean> = new EventEmitter();

  private intersectionObserver?: IntersectionObserver;

  constructor(private element: ElementRef) {}

  public ngAfterViewInit() {
    this.intersectionObserver = new IntersectionObserver((entries) => {
      this.checkForIntersection(entries);
    }, {});
    this.intersectionObserver.observe(<Element>this.element.nativeElement);
  }

  public ngOnDestroy() {
    this.intersectionObserver.disconnect();
  }

  private checkForIntersection = (
    entries: Array<IntersectionObserverEntry>
  ) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      const isIntersecting =
        (<any>entry).isIntersecting &&
        entry.target === this.element.nativeElement;

      if (isIntersecting) {
        this.visible.emit(true);
      }
    });
  };
}
