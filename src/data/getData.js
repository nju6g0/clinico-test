const insured = [
  {
    id: 1,
    code: "P001",
    name: "Alice",
    registration_date: "2023-01-01",
    introducer_code: null,
  },
  {
    id: 2,
    code: "P002",
    name: "Bob",
    registration_date: "2023-02-01",
    introducer_code: "P001",
  },
  {
    id: 3,
    code: "P003",
    name: "Charlie",
    registration_date: "2023-03-01",
    introducer_code: "P001",
  },
  {
    id: 4,
    code: "P004",
    name: "David",
    registration_date: "2023-04-01",
    introducer_code: "P001",
  },
  {
    id: 5,
    code: "P005",
    name: "Eve",
    registration_date: "2023-05-01",
    introducer_code: "P002",
  },
  {
    id: 6,
    code: "P006",
    name: "Frank",
    registration_date: "2023-06-01",
    introducer_code: "P002",
  },
  {
    id: 7,
    code: "P007",
    name: "Grace",
    registration_date: "2023-07-01",
    introducer_code: "P005",
  },
  {
    id: 8,
    code: "P008",
    name: "Hannah",
    registration_date: "2023-08-01",
    introducer_code: "P003",
  },
  {
    id: 9,
    code: "P009",
    name: "Ivy",
    registration_date: "2023-09-01",
    introducer_code: "P003",
  },
  {
    id: 10,
    code: "P010",
    name: "Jack",
    registration_date: "2023-10-01",
    introducer_code: "P009",
  },
  {
    id: 11,
    code: "P011",
    name: "Kate",
    registration_date: "2023-11-01",
    introducer_code: "P001",
  },
  {
    id: 12,
    code: "P012",
    name: "Leo",
    registration_date: "2023-12-01",
    introducer_code: "P004",
  },
  {
    id: 13,
    code: "P013",
    name: "Mia",
    registration_date: "2024-01-01",
    introducer_code: "P012",
  },
  {
    id: 14,
    code: "P014",
    name: "Nina",
    registration_date: "2024-02-01",
    introducer_code: "P005",
  },
  {
    id: 15,
    code: "P015",
    name: "Oscar",
    registration_date: "2024-03-01",
    introducer_code: "P006",
  },
  {
    id: 16,
    code: "P016",
    name: "Paul",
    registration_date: "2024-04-01",
    introducer_code: "P007",
  },
  {
    id: 17,
    code: "P017",
    name: "Quinn",
    registration_date: "2024-05-01",
    introducer_code: "P008",
  },
  {
    id: 18,
    code: "P018",
    name: "Rachel",
    registration_date: "2024-06-01",
    introducer_code: "P009",
  },
  {
    id: 19,
    code: "P019",
    name: "Sam",
    registration_date: "2024-07-01",
    introducer_code: "P010",
  },
  {
    id: 40,
    code: "P020",
    name: "Jane",
    registration_date: "2024-07-02",
    introducer_code: "P009",
  },
  {
    id: 41,
    code: "P021",
    name: "Jennifer",
    registration_date: "2024-07-02",
    introducer_code: "P020",
  },
  {
    id: 42,
    code: "P022",
    name: "Jessy",
    registration_date: "2024-07-15",
    introducer_code: "P009",
  },
  {
    id: 44,
    code: "P023",
    name: "Jimmy",
    registration_date: "2024-07-02",
    introducer_code: "P021",
  },
];

export function getData(code) {
  let result = {};

  // 找出查詢的保戶
  const holder = insured.find((item) => item.code === code);
  if (!holder) return result;
  result = { ...holder, l: [], r: [] };

  // 找出直接介紹保戶
  const directInsured = insured.filter((item) => item.introducer_code === code);

  // 找出間接介紹保戶
  directInsured.forEach((item, index) => {
    const secondhandInsured = insured.filter(
      (el) => el.introducer_code === item.code
    );
    if (index % 2 === 0) {
      result.l.push(item, ...secondhandInsured);
    } else {
      result.r.push(item, ...secondhandInsured);
    }
  });

  return result;
}
