import * as React from "react";

const genericRef = React.createRef<Element>();
const inputRef = React.createRef<HTMLInputElement>();

// throws, undesired: HTMLInputElement extends Element
<input ref={genericRef} />;
// works, desired
React.createElement("input", { ref: genericRef });
// works, desired
<input ref={inputRef} />;
// works, desired
React.createElement("input", { ref: inputRef });

// throws, undesired: same issue as #1 other motivation
const ElementComponent = React.forwardRef<Element>((_, ref) => (
  <div ref={ref} />
));

// works, desired
<ElementComponent ref={genericRef} />;
// works, desired
React.createElement(ElementComponent, { ref: genericRef });
// works, undesired: inputRef.current.value would be undefined at runtime
<ElementComponent ref={inputRef} />;
// works, undesired: see jsx example
React.createElement(ElementComponent, { ref: inputRef });

