# Graph Report - .  (2026-06-13)

## Corpus Check
- Large corpus: 1465 files ╖ ~2,955,155 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 408 nodes · 411 edges · 47 communities (41 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 23|Community 23]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `sourceContext` - 9 edges
3. `sourceContext` - 9 edges
4. `sourceContext` - 9 edges
5. `sourceContext` - 9 edges
6. `sourceContext` - 9 edges
7. `sourceContext` - 9 edges
8. `fingerprint` - 7 edges
9. `fingerprint` - 7 edges
10. `fingerprint` - 7 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities (47 total, 6 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (13): CinematicServiceDetail(), highlightKeywords(), FeaturedServicesGrid(), Footer(), Hero(), SystemsNominal(), dropdownVariants, indicatorVariants (+5 more)

### Community 1 - "Community 1"
Cohesion: 0.09
Nodes (19): Dialogue, DIALOGUES, framePath(), DialogueBeat, GenericCinematicProps, GenericCinematicReveal(), StaffMember, Hero3DLogo() (+11 more)

### Community 2 - "Community 2"
Cohesion: 0.06
Nodes (31): accessibility, boundingBox, height, width, x, y, computedStyles, cssClasses (+23 more)

### Community 3 - "Community 3"
Cohesion: 0.06
Nodes (31): accessibility, boundingBox, height, width, x, y, computedStyles, cssClasses (+23 more)

### Community 4 - "Community 4"
Cohesion: 0.06
Nodes (31): accessibility, boundingBox, height, width, x, y, computedStyles, cssClasses (+23 more)

### Community 5 - "Community 5"
Cohesion: 0.06
Nodes (31): accessibility, boundingBox, height, width, x, y, computedStyles, cssClasses (+23 more)

### Community 6 - "Community 6"
Cohesion: 0.06
Nodes (31): accessibility, boundingBox, height, width, x, y, computedStyles, cssClasses (+23 more)

### Community 7 - "Community 7"
Cohesion: 0.06
Nodes (31): accessibility, boundingBox, height, width, x, y, computedStyles, cssClasses (+23 more)

### Community 8 - "Community 8"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 9 - "Community 9"
Cohesion: 0.11
Nodes (18): devDependencies, concurrently, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react (+10 more)

### Community 10 - "Community 10"
Cohesion: 0.14
Nodes (14): dependencies, framer-motion, geist, lenis, lucide-react, next, @phosphor-icons/react, react (+6 more)

### Community 11 - "Community 11"
Cohesion: 0.20
Nodes (8): cormorant, geSS, geSSUnique, metadata, montserrat, Props, SmoothScrollProvider(), UiTicket()

### Community 12 - "Community 12"
Cohesion: 0.18
Nodes (10): cinematicConfigs, dataFile, { execSync }, fs, outFolder, path, publicDir, videoFiles (+2 more)

### Community 13 - "Community 13"
Cohesion: 0.22
Nodes (7): after, before, content, endIdx, fs, items, startIdx

### Community 14 - "Community 14"
Cohesion: 0.25
Nodes (7): content, endMatch, exportIdx, firstBlock, fs, secondBlock, startIdx

### Community 15 - "Community 15"
Cohesion: 0.29
Nodes (5): dataPath, fs, ix3, path, servicesData

## Knowledge Gaps
- **272 isolated node(s):** `eslintConfig`, `fs`, `path`, `dataPath`, `servicesData` (+267 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Community 10` to `Community 9`?**
  _High betweenness centrality (0.004) - this node is a cross-community bridge._
- **Why does `EyebrowBadge()` connect `Community 1` to `Community 0`?**
  _High betweenness centrality (0.003) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `fs`, `path` to the rest of the system?**
  _272 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.07307692307692308 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.09269162210338681 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._