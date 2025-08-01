// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { useRef, useState } from "react";
import clsx from "clsx";

import { useMergeRefs, warnOnce } from "@cloudscape-design/component-toolkit/internal";
import Icon from "@cloudscape-design/components/icon";
import Tooltip from "@cloudscape-design/components/internal/tooltip-do-not-use";

import { getDataAttributes } from "../internal/base-component/get-data-attributes";
import { InternalBaseComponentProps } from "../internal/base-component/use-base-component";
import customCssProps from "../internal/generated/custom-css-properties";
import { AvatarProps } from "./interfaces.js";
import LoadingDots from "./loading-dots";
import { getContentStyles, getImageStyles, getRootStyles } from "./style";

import styles from "./styles.css.js";

export interface InternalAvatarProps extends AvatarProps, InternalBaseComponentProps {}

const AvatarContent = ({
  color,
  loading,
  initials,
  iconName,
  iconSvg,
  iconUrl,
  ariaLabel,
  width,
  imgUrl,
  style,
}: AvatarProps) => {
  if (loading) {
    return <LoadingDots color={color} width={width} style={style} />;
  }

  if (imgUrl) {
    return <img className={styles.image} src={imgUrl} style={getImageStyles(style)} />;
  }

  if (initials) {
    const letters = initials.length > 2 ? initials.slice(0, 2) : initials;

    if (initials.length > 2) {
      warnOnce("Avatar", `"initials" is longer than 2 characters. Only the first two characters are shown.`);
    }

    return <span className={styles.initials}>{letters}</span>;
  }

  return <Icon name={iconName} svg={iconSvg} url={iconUrl} alt={ariaLabel} size="inherit" />;
};

export default function InternalAvatar({
  color,
  tooltipText,
  initials,
  loading = false,
  ariaLabel,
  iconName,
  iconSvg,
  iconUrl,
  imgUrl,
  style,
  width = 28,
  __internalRootRef = null,
  ...rest
}: InternalAvatarProps) {
  const handleRef = useRef<HTMLDivElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const mergedRef = useMergeRefs(handleRef, __internalRootRef);
  const computedSize = width < 28 ? 28 : width;

  const tooltipAttributes = {
    onFocus: () => {
      setShowTooltip(true);
    },
    onBlur: () => {
      setShowTooltip(false);
    },
    onMouseEnter: () => {
      setShowTooltip(true);
    },
    onMouseLeave: () => {
      setShowTooltip(false);
    },
    onTouchStart: () => {
      setShowTooltip(true);
    },
    onTouchEnd: () => {
      setShowTooltip(false);
    },
  };

  return (
    <div
      {...getDataAttributes(rest)}
      ref={mergedRef}
      tabIndex={0}
      className={clsx(styles.root, styles[`avatar-color-${color}`], { [styles.initials]: initials })}
      role="img"
      aria-label={ariaLabel}
      {...tooltipAttributes}
      style={{ [customCssProps.avatarSize]: `${computedSize}px`, ...getRootStyles(style) }}
    >
      {showTooltip && tooltipText && (
        <Tooltip
          value={tooltipText}
          trackRef={handleRef}
          // This is added to ensure tooltip is closed when clicked for consistency with other tooltip usages
          contentAttributes={{ onPointerDown: () => setShowTooltip(false) }}
        />
      )}

      {/* aria-hidden is added so that screen readers focus only the parent div */}
      {/* when it is not hidden, it becomes unstable in JAWS */}
      <div className={styles.content} aria-hidden="true" style={getContentStyles(style)}>
        <AvatarContent
          color={color}
          ariaLabel={ariaLabel}
          initials={initials}
          loading={loading}
          iconName={iconName}
          iconSvg={iconSvg}
          iconUrl={iconUrl}
          imgUrl={imgUrl}
          style={style}
          width={computedSize}
        />
      </div>
    </div>
  );
}
