"use client";

import React, { useState, useRef } from "react";
import { AlbersUsa } from "@visx/geo";
import { geoPath } from "@visx/vendor/d3-geo";
import * as topojson from "topojson-client";
import topology from "@/data/tx_counties.json";
import type {
  Feature,
  FeatureCollection,
  Geometry,
  GeoJsonProperties,
} from "geojson";
import type {
  Topology,
  GeometryCollection as TopoGeometryCollection,
} from "topojson-specification";

export const background = "#EBF4F3";

export type GeoAlbersUsaProps = {
  width: number;
  height: number;
};

/* --------- Strongly type the imported TopoJSON --------- */
type TxObjects = { tx_counties: TopoGeometryCollection };
const topo = topology as unknown as Topology<TxObjects>;

/* --------- TopoJSON -> GeoJSON (FeatureCollection) --------- */
const geo = topojson.feature(
  topo,
  topo.objects.tx_counties
) as FeatureCollection<Geometry, GeoJsonProperties>;

const counties: Feature<Geometry, GeoJsonProperties>[] = geo.features;

/* --------- Active counties & colors --------- */
const activeCountySet = new Set(["Taylor County", "Hays County"]);
const activeColor = "#9020FF";
const disabledColor = "#c3cbd6";

export default function TexasMap({ width, height }: GeoAlbersUsaProps) {
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hoveredCountyRef = useRef<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  if (width < 10 || height < 10) return null;

  // Instantly update tooltip content and position using refs
  const showTooltipAt = (countyName: string, e: React.MouseEvent) => {
    hoveredCountyRef.current = countyName;
    setShowTooltip(true);
    window.requestAnimationFrame(() => {
      if (!tooltipRef.current || !containerRef.current) return;
      tooltipRef.current.innerText = countyName;
      const rect = containerRef.current.getBoundingClientRect();
      tooltipRef.current.style.top = `${e.clientY - rect.top - 40}px`;
      tooltipRef.current.style.left = `${e.clientX - rect.left + 10}px`;
    });
  };

  const hideTooltip = () => {
    hoveredCountyRef.current = null;
    setShowTooltip(false);
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        width={width}
        height={height}
        style={{ background, borderRadius: "14px", display: "block" }}
      >
        {/* Give AlbersUsa neutral values; we’ll fit/center inside the render-prop */}
        <AlbersUsa<Feature<Geometry>>
          data={counties}
          scale={10}
          translate={[0, 0]}
        >
          {({ features }) => {
            // We'll mutate the shared D3 projection once before drawing paths.
            let adjusted = false;

            return features.map(({ feature, projection }, i) => {
              // One-time fit-to-bounds using the current projection instance.
              if (!adjusted) {
                const pad = Math.min(width, height) * 0.04; // 4% padding
                const innerW = Math.max(1, width - 2 * pad);
                const innerH = Math.max(1, height - 2 * pad);

                const pathGen = geoPath(projection);
                const fc: FeatureCollection<Geometry, GeoJsonProperties> = {
                  type: "FeatureCollection",
                  features: counties,
                };

                const [[x0, y0], [x1, y1]] = pathGen.bounds(fc);
                const dx = Math.max(1, x1 - x0);
                const dy = Math.max(1, y1 - y0);

                // Scale to fit the inner box
                const k = Math.min(innerW / dx, innerH / dy);

                // Center within the padded box
                const tx = pad + innerW / 2 - (k * (x0 + x1)) / 2;
                const ty = pad + innerH / 2 - (k * (y0 + y1)) / 2;

                // Apply scale and translate on the projection
                // Note: for D3 projections, scale is multiplicative relative to current scale.
                projection.scale(projection.scale() * k).translate([tx, ty]);

                adjusted = true;
              }

              // Generate the path AFTER the projection has been adjusted
              const d = geoPath(projection)(feature) || "";

              const countyName = feature.properties?.COUNTY as
                | string
                | undefined;
              const isActive = !!countyName && activeCountySet.has(countyName);

              return (
                <path
                  key={`county-${i}`}
                  d={d}
                  fill={isActive ? activeColor : disabledColor}
                  stroke={background}
                  strokeWidth={0.5}
                  onMouseEnter={(e) => {
                    if (isActive && countyName) {
                      showTooltipAt(countyName, e);
                    }
                  }}
                  onMouseMove={(e) => {
                    if (isActive && hoveredCountyRef.current) {
                      showTooltipAt(hoveredCountyRef.current, e);
                    }
                  }}
                  onMouseLeave={hideTooltip}
                  style={{ cursor: isActive ? "pointer" : "default" }}
                />
              );
            });
          }}
        </AlbersUsa>
      </svg>

      {showTooltip && (
        <div
          ref={tooltipRef}
          style={{
            position: "absolute",
            backgroundColor: "#000",
            color: "#fff",
            padding: "6px 10px",
            fontSize: "14px",
            fontWeight: 500,
            borderRadius: "6px",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            zIndex: 1000,
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            transform: "translateZ(0)",
          }}
        />
      )}
    </div>
  );
}
