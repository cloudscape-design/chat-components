// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

// The instanceof Node/HTMLElement/SVGElement checks can fail if the target element
// belongs to a different window than the respective type.

export function isNode(target: unknown): target is Node {
  return (
    target instanceof Node ||
    (target !== null &&
      typeof target === "object" &&
      "nodeType" in target &&
      typeof target.nodeType === "number" &&
      "nodeName" in target &&
      typeof target.nodeName === "string" &&
      "parentNode" in target &&
      typeof target.parentNode === "object")
  );
}

export function isHTMLElement(target: unknown): target is HTMLElement {
  return (
    target instanceof HTMLElement ||
    (isNode(target) &&
      target.nodeType === Node.ELEMENT_NODE &&
      "style" in target &&
      typeof target.style === "object" &&
      typeof target.ownerDocument === "object" &&
      !isSVGElement(target))
  );
}

export function isSVGElement(target: unknown): target is SVGElement {
  return (
    target instanceof SVGElement ||
    (isNode(target) &&
      target.nodeType === Node.ELEMENT_NODE &&
      "ownerSVGElement" in target &&
      typeof target.ownerSVGElement === "object")
  );
}
