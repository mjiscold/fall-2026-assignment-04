---
name: erd-generator
description: >
  Generate, validate, and render Mermaid entity-relationship diagrams when the user
  requests an ERD, database schema, data model, or architecture diagram.
---

# ERD Generator Skill

When this skill is triggered, follow this workflow.

## 1. Parse Requirements

Read the user's domain requirements and identify:

- Entities
- Attributes
- Primary keys (PK)
- Foreign keys (FK)
- Relationships
- Cardinalities

Use valid Mermaid `erDiagram` syntax.

## 2. Write Mermaid Source

Write the generated Mermaid ERD directly to:

docs/architecture/schema.mmd

Do not only display the Mermaid in the response. The file must be created or updated.

## 3. Validate and Render

Run:

node .agent/skills/erd-generator/scripts/render_erd.js docs/architecture/schema.mmd

The renderer should validate the Mermaid syntax and create:

docs/architecture/erd.svg

## 4. Self-Correction Loop

If the renderer fails and outputs `SYNTAX_ERROR`:

1. Read the error message.
2. Inspect `docs/architecture/schema.mmd`.
3. Correct the Mermaid syntax.
4. Save the corrected file.
5. Run the renderer again.

Retry no more than 3 times.

If the diagram still fails after 3 attempts, stop and report the final error.

## 5. Final Output

After successful validation:

- Show the final raw Mermaid ERD to the user.
- Confirm that the Mermaid source was saved to:
  `docs/architecture/schema.mmd`
- Confirm that the rendered SVG was saved to:
  `docs/architecture/erd.svg`