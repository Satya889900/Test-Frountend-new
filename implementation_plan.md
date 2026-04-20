# Implementation Plan

## Goal
- Make the template preview in **AllTemplates** display at an A4 size (210 mm × 297 mm) when shown in full view.
- Ensure the preview looks polished and matches the design of other pages.
- In the **CreateTemplate** workflow, show different form fields depending on the selected document type (e.g., Resume, Business Letter, Invoice, etc.).
- Keep the existing functionality intact and preserve premium UI aesthetics.

## Changes Required
1. **LetterPreview component (src/data/Constant.jsx)**
   - Add an `a4Style` object that applies A4 dimensions when `compact` is `false`.
   - Wrap the inner preview markup with a `<div style={a4Style}>`.
   - Ensure the scaling logic for thumbnails (`compact`) remains unchanged.
2. **AllTemplates page (src/pages/Templates/Alltemplates.jsx)**
   - Use the non‑compact `LetterPreview` for a full‑size preview when a user clicks a "View Full" button (add this button to each card).
   - Optionally add a modal or overlay to display the A4 preview without navigating away.
3. **CreateTemplate workflow (src/pages/Templates/TemplatePage.jsx)**
   - Replace the static `FORM_FIELDS` array with a dynamic builder that selects fields based on `state.docType`.
   - Add field definitions for common document types: `resume`, `letter`, `invoice`, `report`, `proposal`, `memo`.
   - Update the rendering loop to use the new `FORM_FIELDS` variable.
4. **Styling Adjustments**
   - Ensure the new A4 preview respects existing theme colors, borders, and shadows.
   - Add any necessary Tailwind utility classes or inline styles to keep the premium look.
5. **Testing**
   - Verify long words wrap correctly in the preview (already handled).
   - Confirm that selecting different document types swaps the form fields appropriately.
   - Check that the A4 preview renders correctly on various screen sizes.

## Open Questions
- Do you want the full‑size A4 preview to open in a modal, a new route, or replace the current page view?
- Should the dynamic form fields include any custom sections (e.g., education for resumes) beyond the basic fields listed?
- Any specific design tweaks for the AllTemplates grid (spacing, card size) you’d like to apply?

## Verification Plan
- Run the app locally and navigate to **All Templates**; click a template to open the full preview and confirm A4 dimensions.
- In **Create Template**, switch the document type selector and verify the form updates instantly.
- Use the browser to test word‑wrapping and overall UI consistency.

---
*Please review the plan and let me know if any adjustments are needed before I start implementing the changes.*
