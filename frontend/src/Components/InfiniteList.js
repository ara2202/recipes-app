import React, { useRef, useCallback } from 'react';

export default function InfiniteList({
  elements,
  renderElement,
  isLoading,
  renderLoading,
  isError,
  renderError,
  hasMore,
  renderEmpty,
  setPageNumber,
}) {
  const observer = useRef();

  const lastElementRef = useCallback(
    node => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(prevPageNumber => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, setPageNumber],
  );

  return (
    <>
      {elements.map((element, index) =>
        elements.length === index + 1
          ? renderElement(element, lastElementRef)
          : renderElement(element),
      )}

      {isLoading && renderLoading()}

      {!isError && !isLoading && !elements.length && renderEmpty()}

      {isError && renderError()}
    </>
  );
}
