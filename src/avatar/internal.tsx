// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { warnOnce } from "@cloudscape-design/component-toolkit/internal";
import Icon from "@cloudscape-design/components/icon";
import Tooltip from "@cloudscape-design/components/internal/tooltip-do-not-use";
import clsx from "clsx";
import { useRef, useState } from "react";

import { getDataAttributes } from "../internal/base-component/get-data-attributes";
import { InternalBaseComponentProps } from "../internal/base-component/use-base-component";
import { useMergeRefs } from "../internal/utils/use-merge-refs";

import { AvatarProps } from "./interfaces.js";
import LoadingDots from "./loading-dots";
import styles from "./styles.css.js";

export interface InternalAvatarProps extends AvatarProps, InternalBaseComponentProps {}

const AvatarContent = ({ color, loading, initials, iconName, iconSvg, iconUrl, ariaLabel }: AvatarProps) => {
  if (loading) {
    return <LoadingDots color={color} />;
  }

  if (initials) {
    const letters = initials.length > 2 ? initials.slice(0, 2) : initials;

    if (initials.length > 2) {
      warnOnce("Avatar", `"initials" is longer than 2 characters. Only the first two characters are shown.`);
    }

    return <span>{letters}</span>;
  }

  return <Icon name={iconName} svg={iconSvg} url={iconUrl} alt={ariaLabel} />;
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
  __internalRootRef = null,
  ...rest
}: InternalAvatarProps) {
  const handleRef = useRef<HTMLDivElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const mergedRef = useMergeRefs(handleRef, __internalRootRef);

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
      className={clsx(styles.root, styles[`avatar-color-${color}`], {
        [styles.initials]: initials,
      })}
      role="img"
      aria-label={ariaLabel}
      {...tooltipAttributes}
    >
      {showTooltip && tooltipText && (
        <Tooltip
          value={tooltipText}
          trackRef={handleRef}
          // This is added to ensure tooltip is closed when clicked for consistency with other tooltip usages
          contentAttributes={{ onPointerDown: () => setShowTooltip(false) }}
        />
      )}

      <div className={styles.content}>
        <AvatarContent
          color={color}
          ariaLabel={ariaLabel}
          initials={initials}
          loading={loading}
          iconName={iconName}
          iconSvg={iconSvg}
          iconUrl={iconUrl}
        />
      </div>
    </div>
  );
}
