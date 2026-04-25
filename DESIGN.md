---
name: UFC Future-Tech Institutional
colors:
  surface: '#101415'
  surface-dim: '#101415'
  surface-bright: '#363a3b'
  surface-container-lowest: '#0b0f10'
  surface-container-low: '#191c1e'
  surface-container: '#1d2022'
  surface-container-high: '#272a2c'
  surface-container-highest: '#323537'
  on-surface: '#e0e3e5'
  on-surface-variant: '#c1c6d7'
  inverse-surface: '#e0e3e5'
  inverse-on-surface: '#2d3133'
  outline: '#8b90a0'
  outline-variant: '#414755'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e69'
  primary-container: '#4b8eff'
  on-primary-container: '#00285c'
  inverse-primary: '#005bc1'
  secondary: '#ddfcff'
  on-secondary: '#00363a'
  secondary-container: '#00f1fe'
  on-secondary-container: '#006a70'
  tertiary: '#b8c8da'
  on-tertiary: '#233240'
  tertiary-container: '#8392a3'
  on-tertiary-container: '#1c2b39'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a41'
  on-primary-fixed-variant: '#004493'
  secondary-fixed: '#74f5ff'
  secondary-fixed-dim: '#00dbe7'
  on-secondary-fixed: '#002022'
  on-secondary-fixed-variant: '#004f54'
  tertiary-fixed: '#d4e4f7'
  tertiary-fixed-dim: '#b8c8da'
  on-tertiary-fixed: '#0d1d2a'
  on-tertiary-fixed-variant: '#394857'
  background: '#101415'
  on-background: '#e0e3e5'
  surface-variant: '#323537'
typography:
  display-xl:
    fontFamily: Manrope
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin: 48px
  container-max: 1440px
  stack-xs: 8px
  stack-md: 24px
  stack-xl: 64px
---

## Brand & Style

The design system is engineered to project a sense of "Cognitive Sophistication." It bridges the gap between a prestigious academic institution and a high-frontier AI research lab. The brand personality is intellectual, precise, and visionary, targeting elite researchers, athletes, and institutional stakeholders.

The visual style is a hybrid of **Minimalism** and **Glassmorphism**. It utilizes expansive negative space to signify clarity of thought, while employing translucent, layered surfaces to represent the complexity of neural networks and data processing. The aesthetic is "Dark-Mode First," creating a premium, focused environment where information is illuminated like light through deep space.

## Colors

The palette is anchored in **Deep Midnight Blue (#000D1A)**, providing a limitless, high-contrast backdrop that reduces eye strain and emphasizes technical precision. 

- **Electric Blue (#007AFF)** serves as the primary action color, representing institutional authority and core connectivity.
- **Cyan (#00F2FF)** is used for high-frequency data points, accents, and "glowing" states, mimicking the aesthetic of active neural pathways.
- **Neutral Whites and Greys** are used sparingly for high-readability body text and subtle borders.

Gradients should transition from Electric Blue to Cyan at a 135-degree angle to simulate directional energy flow.

## Typography

This design system utilizes **Manrope** exclusively. This typeface was chosen for its geometric purity and modern technical feel, which aligns with the theme of AI evolution. 

- **Display & Headlines:** Use tighter letter spacing and heavier weights to create an impactful, institutional presence.
- **Body Text:** Use regular weights with generous line heights to ensure academic content is easily digestible.
- **Labels:** Small caps with increased letter spacing should be used for technical metadata and UI signals to reinforce the futuristic, data-driven aesthetic.

## Layout & Spacing

The layout follows a **Fixed Grid** system for large-scale institutional dashboards, ensuring content remains structured and authoritative. A 12-column grid is standard, with generous margins to allow the UI to "breathe."

- **Rhythm:** All spacing is based on a 4px baseline, but primary layout blocks should prefer multiples of 24px (6 units) to create a sense of expansive, high-end design.
- **Neural Network Pattern:** Backgrounds may feature subtle, non-intrusive neural network patterns (low opacity strokes) that align with grid intersections to reinforce the connection between technology and structure.

## Elevation & Depth

Depth is achieved through **Glassmorphism** rather than traditional shadows. Surfaces do not "cast" shadows as if lit from above; instead, they appear to float within a deep medium.

- **Surface Layers:** Base level is the Midnight Blue. Overlays use semi-transparent white (3-8% opacity) with a `backdrop-filter: blur(20px)`.
- **Borders:** Every glass container must have a 1px "inner-glow" border. This is a linear gradient border (top-left to bottom-right) using a low-opacity Cyan to create a thin, sharp edge that suggests the surface is catching light.
- **Glow Accents:** High-priority elements use a soft, outer Cyan glow (blur 15px, opacity 0.2) to simulate active energy.

## Shapes

The shape language is "Soft-Technical." By using a **0.25rem (4px)** base roundedness, the system maintains a sharp, professional edge while avoiding the coldness of perfect 90-degree angles.

- **Component Radius:** Standard buttons and inputs use the 4px radius. 
- **Card Radius:** Large information cards use a 12px (rounded-xl) radius to differentiate structural containers from interactive elements.
- **Neural Nodes:** Decorative dots or status indicators are perfectly circular to contrast against the rectangular grid.

## Components

### Buttons
- **Primary:** Gradient fill (Electric Blue to Cyan), white text, no border. On hover, increase the intensity of the Cyan glow.
- **Secondary:** Ghost style. Transparent background with the 1px gradient "inner-glow" border. Text in Cyan.

### Cards
- Futuristic "Data-Panels" using the frosted glass effect. No solid background. Use a subtle neural network pattern overlay on the background layer of the card to indicate "active processing."

### Inputs & Form Fields
- Minimalist bottom-border only or a very faint 4-sided stroke (3% white). Focus state triggers a Cyan glow on the bottom border and a slight shift in the backdrop blur intensity.

### Neural Data Visualizers
- Unique to this system: connecting lines between cards or list items should be 1px Cyan strokes with "moving pulses" (animated gradient) to signify the evolution and flow of AI-driven data.

### Chips & Tags
- Pill-shaped with a solid 10% opacity Cyan fill and high-contrast Cyan text. Used for "AI-Verified" or "Institutional" status markers.