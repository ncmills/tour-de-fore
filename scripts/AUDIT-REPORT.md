# Engine Bias Audit Report — BASELINE (pre-fix)

- **Total input combos tested:** 2,992
- **Total destination slots filled:** 6,179
- **Unique output sets:** 1134 / 2992 (37.9% unique)
- **Destinations in database:** 133
- **Destinations ever picked:** 132
- **Destinations NEVER picked:** 1
- **Empty result combos:** 841

## Top 20 Most-Picked Destinations

| Rank | City | Region | Count | % of Slots | Budget | Mid | Premium |
|------|------|--------|-------|-----------|--------|-----|--------|
| 1 | Outer Banks, NC | Southeast | 137 | 2.22% | 0 | 137 | 0 |
| 2 | Las Vegas, NV | Southwest | 97 | 1.57% | 0 | 0 | 97 |
| 3 | Seattle, WA | Pacific NW | 93 | 1.51% | 0 | 1 | 92 |
| 4 | Austin, TX | South Central | 90 | 1.46% | 0 | 0 | 90 |
| 5 | Tucson, AZ | Southwest | 86 | 1.39% | 8 | 78 | 0 |
| 6 | Boise, ID | Pacific NW | 86 | 1.39% | 86 | 0 | 0 |
| 7 | Bend, OR | Pacific NW | 82 | 1.33% | 0 | 81 | 1 |
| 8 | Dallas-Fort Worth, TX | South Central | 82 | 1.33% | 0 | 0 | 82 |
| 9 | Scottsdale, AZ | Southwest | 74 | 1.20% | 0 | 2 | 72 |
| 10 | Cape Cod, MA | Northeast | 74 | 1.20% | 0 | 0 | 74 |
| 11 | Reno, NV | Southwest | 72 | 1.17% | 0 | 9 | 63 |
| 12 | Coeur d'Alene, ID | Pacific NW | 72 | 1.17% | 0 | 0 | 72 |
| 13 | Park City, UT | Mountain West | 72 | 1.17% | 0 | 1 | 71 |
| 14 | Sun Valley / Ketchum, ID | Pacific NW | 70 | 1.13% | 0 | 1 | 69 |
| 15 | Omaha, NE | Midwest | 70 | 1.13% | 70 | 0 | 0 |
| 16 | Branson, MO | South Central | 70 | 1.13% | 0 | 69 | 1 |
| 17 | Lake Geneva, WI | Midwest | 69 | 1.12% | 0 | 1 | 68 |
| 18 | Laughlin, NV | Southwest | 68 | 1.10% | 68 | 0 | 0 |
| 19 | Traverse City, MI | Midwest | 68 | 1.10% | 0 | 2 | 66 |
| 20 | Harbor Springs / Petoskey, MI | Midwest | 67 | 1.08% | 0 | 0 | 67 |

## Bottom 20 Least-Picked Destinations

| Rank | City | Region | Count | % of Slots |
|------|------|--------|-------|----------|
| 132 | Cooperstown, NY | Northeast | 9 | 0.15% |
| 131 | Biloxi, MS | Southeast | 9 | 0.15% |
| 130 | Big Sky, MT | Mountain West | 9 | 0.15% |
| 129 | French Lick, IN | Midwest | 13 | 0.21% |
| 128 | Horseshoe Bay, TX | South Central | 18 | 0.29% |
| 127 | Salida, CO | Mountain West | 21 | 0.34% |
| 126 | Walla Walla, WA | Pacific NW | 21 | 0.34% |
| 125 | Kansas City, MO | Midwest | 23 | 0.37% |
| 124 | Hudson Valley, NY | Northeast | 24 | 0.39% |
| 123 | Duluth, MN | Midwest | 24 | 0.39% |
| 122 | Lake of the Ozarks, MO | South Central | 25 | 0.40% |
| 121 | Keystone / Custer, SD | Mountain West | 26 | 0.42% |
| 120 | Mystic, CT | Northeast | 27 | 0.44% |
| 119 | Saratoga Springs, NY | Northeast | 27 | 0.44% |
| 118 | Des Moines, IA | Midwest | 27 | 0.44% |
| 117 | Gig Harbor, WA | Pacific NW | 27 | 0.44% |
| 116 | Fredericksburg, TX | South Central | 28 | 0.45% |
| 115 | Amelia Island, FL | Southeast | 28 | 0.45% |
| 114 | Cody, WY | Mountain West | 28 | 0.45% |
| 113 | Cape May, NJ | Northeast | 29 | 0.47% |

## Destinations NEVER Picked (1)

- Cannon Beach / Seaside, OR (Pacific NW)

## Regional Distribution

| Region | Dests | Expected % | Actual % | Ratio (1.0 = fair) |
|--------|-------|-----------|---------|-------------------|
| Southwest | 14 | 10.5% | 13.6% | 1.29 |
| Pacific NW | 16 | 12.0% | 13.5% | 1.13 |
| Mountain West | 21 | 15.8% | 14.4% | 0.91 |
| Midwest | 20 | 15.0% | 14.0% | 0.93 |
| Southeast | 23 | 17.3% | 16.2% | 0.94 |
| Northeast | 22 | 16.5% | 14.2% | 0.86 |
| South Central | 17 | 12.8% | 14.0% | 1.09 |

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
| Austin, TX | South Central | 98 | 30 | 2 | 8 | 16 | 6 | 8 | 12 | 5 | 8 | 4 | $1342 |
| Boise, ID | Pacific NW | 97 | 30 | 0 | 8 | 16 | 6 | 8 | 12 | 5 | 8 | 5 | $785 |
| Vail, CO | Mountain West | 97 | 30 | 3 | 8 | 16 | 6 | 8 | 12 | 3 | 8 | 4 | $1503 |
| Traverse City, MI | Midwest | 97 | 30 | 1 | 8 | 16 | 6 | 8 | 12 | 5 | 8 | 5 | $1285 |
| New Orleans, LA | South Central | 97 | 30 | 1 | 8 | 16 | 6 | 8 | 12 | 5 | 8 | 4 | $1324 |
| Las Vegas, NV | Southwest | 96 | 30 | 7 | 8 | 8 | 6 | 8 | 12 | 5 | 8 | 2 | $2038 |
| Steamboat Springs, CO | Mountain West | 96 | 30 | 0 | 8 | 16 | 6 | 8 | 12 | 5 | 8 | 4 | $1202 |
| Missoula, MT | Mountain West | 96 | 30 | 0 | 8 | 16 | 6 | 8 | 12 | 5 | 8 | 4 | $741 |
| Grand Rapids, MI | Midwest | 96 | 30 | 0 | 8 | 16 | 6 | 8 | 12 | 5 | 8 | 4 | $861 |
| Columbus, OH | Midwest | 96 | 30 | 0 | 8 | 16 | 6 | 8 | 12 | 5 | 8 | 4 | $808 |

## Dominance (Destinations appearing in most runs)

| City | Region | Appears In | % of Runs |
|------|--------|-----------|----------|
| Outer Banks, NC | Southeast | 137 | 4.6% |
| Las Vegas, NV | Southwest | 97 | 3.2% |
| Seattle, WA | Pacific NW | 93 | 3.1% |
| Austin, TX | South Central | 90 | 3.0% |
| Tucson, AZ | Southwest | 86 | 2.9% |
| Boise, ID | Pacific NW | 86 | 2.9% |
| Bend, OR | Pacific NW | 82 | 2.7% |
| Dallas-Fort Worth, TX | South Central | 82 | 2.7% |
| Scottsdale, AZ | Southwest | 74 | 2.5% |
| Cape Cod, MA | Northeast | 74 | 2.5% |

## Concentration Metrics

- **Top 5 destinations hold:** 8.2% of all slots
- **Top 10 destinations hold:** 14.6% of all slots
- **Fair share per destination:** 0.75%
- **Most over-represented:** Outer Banks, NC at 3.0x fair share
