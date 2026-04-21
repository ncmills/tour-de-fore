# Engine Bias Audit Report — BASELINE (pre-fix)

- **Total input combos tested:** 2,992
- **Total destination slots filled:** 6,187
- **Unique output sets:** 1228 / 2992 (41.0% unique)
- **Destinations in database:** 133
- **Destinations ever picked:** 132
- **Destinations NEVER picked:** 1
- **Empty result combos:** 840

## Top 20 Most-Picked Destinations

| Rank | City | Region | Count | % of Slots | Budget | Mid | Premium |
|------|------|--------|-------|-----------|--------|-----|--------|
| 1 | Outer Banks, NC | Southeast | 143 | 2.31% | 0 | 142 | 1 |
| 2 | Scottsdale, AZ | Southwest | 97 | 1.57% | 0 | 4 | 93 |
| 3 | Las Vegas, NV | Southwest | 94 | 1.52% | 0 | 0 | 94 |
| 4 | Tucson, AZ | Southwest | 93 | 1.50% | 23 | 70 | 0 |
| 5 | Seattle, WA | Pacific NW | 80 | 1.29% | 0 | 1 | 79 |
| 6 | New Orleans, LA | South Central | 80 | 1.29% | 0 | 9 | 71 |
| 7 | St. George, UT | Southwest | 77 | 1.24% | 10 | 67 | 0 |
| 8 | Boise, ID | Pacific NW | 76 | 1.23% | 76 | 0 | 0 |
| 9 | Laughlin, NV | Southwest | 73 | 1.18% | 73 | 0 | 0 |
| 10 | Coeur d'Alene, ID | Pacific NW | 70 | 1.13% | 0 | 1 | 69 |
| 11 | Deadwood, SD | Mountain West | 67 | 1.08% | 66 | 1 | 0 |
| 12 | Traverse City, MI | Midwest | 66 | 1.07% | 0 | 1 | 65 |
| 13 | Fredericksburg, TX | South Central | 66 | 1.07% | 0 | 0 | 66 |
| 14 | Phoenix / Mesa, AZ | Southwest | 64 | 1.03% | 3 | 60 | 1 |
| 15 | Sedona, AZ | Southwest | 64 | 1.03% | 0 | 1 | 63 |
| 16 | Spokane, WA | Pacific NW | 63 | 1.02% | 63 | 0 | 0 |
| 17 | Hot Springs, AR | South Central | 62 | 1.00% | 62 | 0 | 0 |
| 18 | Dallas-Fort Worth, TX | South Central | 62 | 1.00% | 0 | 0 | 62 |
| 19 | Lake Havasu City, AZ | Southwest | 61 | 0.99% | 61 | 0 | 0 |
| 20 | Bandon, OR | Pacific NW | 61 | 0.99% | 0 | 0 | 61 |

## Bottom 20 Least-Picked Destinations

| Rank | City | Region | Count | % of Slots |
|------|------|--------|-------|----------|
| 132 | Keystone / Custer, SD | Mountain West | 4 | 0.06% |
| 131 | Horseshoe Bay, TX | South Central | 7 | 0.11% |
| 130 | Flagstaff, AZ | Southwest | 8 | 0.13% |
| 129 | Biloxi, MS | Southeast | 9 | 0.15% |
| 128 | Cooperstown, NY | Northeast | 14 | 0.23% |
| 127 | Kansas City, MO | Midwest | 19 | 0.31% |
| 126 | Cody, WY | Mountain West | 19 | 0.31% |
| 125 | Brainerd, MN | Midwest | 20 | 0.32% |
| 124 | Pagosa Springs, CO | Mountain West | 20 | 0.32% |
| 123 | St. Louis, MO | Midwest | 23 | 0.37% |
| 122 | Poconos, PA | Northeast | 28 | 0.45% |
| 121 | Mystic, CT | Northeast | 28 | 0.45% |
| 120 | Catskills, NY | Northeast | 28 | 0.45% |
| 119 | Bretton Woods, NH | Northeast | 28 | 0.45% |
| 118 | Telluride, CO | Mountain West | 28 | 0.45% |
| 117 | Amelia Island, FL | Southeast | 29 | 0.47% |
| 116 | Gulf Shores, AL | Southeast | 29 | 0.47% |
| 115 | Hudson Valley, NY | Northeast | 30 | 0.48% |
| 114 | Asheville, NC | Southeast | 30 | 0.48% |
| 113 | Big Sky, MT | Mountain West | 30 | 0.48% |

## Destinations NEVER Picked (1)

- Cannon Beach / Seaside, OR (Pacific NW)

## Regional Distribution

| Region | Dests | Expected % | Actual % | Ratio (1.0 = fair) |
|--------|-------|-----------|---------|-------------------|
| Southwest | 14 | 10.5% | 13.7% | 1.30 |
| Pacific NW | 16 | 12.0% | 13.5% | 1.12 |
| Mountain West | 21 | 15.8% | 14.2% | 0.90 |
| Midwest | 20 | 15.0% | 13.8% | 0.92 |
| Southeast | 23 | 17.3% | 16.1% | 0.93 |
| Northeast | 22 | 16.5% | 14.5% | 0.88 |
| South Central | 17 | 12.8% | 14.2% | 1.11 |

## Input Sensitivity

| Parameter | Unique Outputs | Total Values | Sensitivity |
|-----------|---------------|-------------|------------|
| Budget | 5 | 5 | 100% |
| Course Quality | 4 | 4 | 100% |
| Group Size | 6 | 6 | 100% |
| Region | 7 | 7 | 100% |
| Activity | 7 | 7 | 100% |

## Score Breakdown (Neutral Inputs — Top 15)

| City | Region | Total | CourseQ | Budget | CourseN | WalkBars | LateNt | Dining | Acts | Airport | Arrival | WalkBarCount | Est$/pp |
|------|--------|-------|--------|--------|---------|----------|--------|--------|------|---------|---------|-------------|--------|
| Jackson, WY | Mountain West | 107 | 30 | 11 | 8 | 16 | 6 | 8 | 12 | 5 | 8 | 4 | $2446 |
| Scottsdale, AZ | Southwest | 101 | 30 | 4 | 8 | 16 | 6 | 8 | 12 | 5 | 8 | 5 | $1689 |
| Coeur d'Alene, ID | Pacific NW | 99 | 30 | 4 | 8 | 16 | 6 | 8 | 12 | 3 | 8 | 4 | $1671 |
| Seattle, WA | Pacific NW | 98 | 30 | 1 | 8 | 16 | 6 | 8 | 12 | 5 | 8 | 4 | $1312 |
| Telluride, CO | Mountain West | 98 | 30 | 2 | 8 | 16 | 6 | 8 | 12 | 5 | 8 | 4 | $1378 |
| Traverse City, MI | Midwest | 98 | 30 | 2 | 8 | 16 | 6 | 8 | 12 | 5 | 8 | 5 | $1456 |
| Austin, TX | South Central | 98 | 30 | 2 | 8 | 16 | 6 | 8 | 12 | 5 | 8 | 4 | $1342 |
| Boise, ID | Pacific NW | 97 | 30 | 0 | 8 | 16 | 6 | 8 | 12 | 5 | 8 | 5 | $785 |
| Vail, CO | Mountain West | 97 | 30 | 3 | 8 | 16 | 6 | 8 | 12 | 3 | 8 | 4 | $1503 |
| New Orleans, LA | South Central | 97 | 30 | 1 | 8 | 16 | 6 | 8 | 12 | 5 | 8 | 4 | $1324 |
| Las Vegas, NV | Southwest | 96 | 30 | 7 | 8 | 8 | 6 | 8 | 12 | 5 | 8 | 2 | $2038 |
| Steamboat Springs, CO | Mountain West | 96 | 30 | 0 | 8 | 16 | 6 | 8 | 12 | 5 | 8 | 4 | $1202 |
| Missoula, MT | Mountain West | 96 | 30 | 0 | 8 | 16 | 6 | 8 | 12 | 5 | 8 | 4 | $741 |
| Grand Rapids, MI | Midwest | 96 | 30 | 0 | 8 | 16 | 6 | 8 | 12 | 5 | 8 | 4 | $861 |
| Columbus, OH | Midwest | 96 | 30 | 0 | 8 | 16 | 6 | 8 | 12 | 5 | 8 | 4 | $808 |

## Dominance (Destinations appearing in most runs)

| City | Region | Appears In | % of Runs |
|------|--------|-----------|----------|
| Outer Banks, NC | Southeast | 143 | 4.8% |
| Scottsdale, AZ | Southwest | 97 | 3.2% |
| Las Vegas, NV | Southwest | 94 | 3.1% |
| Tucson, AZ | Southwest | 93 | 3.1% |
| Seattle, WA | Pacific NW | 80 | 2.7% |
| New Orleans, LA | South Central | 80 | 2.7% |
| St. George, UT | Southwest | 77 | 2.6% |
| Boise, ID | Pacific NW | 76 | 2.5% |
| Laughlin, NV | Southwest | 73 | 2.4% |
| Coeur d'Alene, ID | Pacific NW | 70 | 2.3% |

## Concentration Metrics

- **Top 5 destinations hold:** 8.2% of all slots
- **Top 10 destinations hold:** 14.3% of all slots
- **Fair share per destination:** 0.75%
- **Most over-represented:** Outer Banks, NC at 3.1x fair share
