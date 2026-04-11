import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

const DEAL_STAGES = ['Account', 'Finance', 'RTO', 'PDI', 'Accessories'];
const STATUSES = ['active', 'completed', 'pending', 'blocked'];

const CAR_MODELS = [
  { model: 'TATA Safari', variants: ['Smart', 'Pure', 'Adventure', 'Accomplished'], basePrice: 1600000, incentive: 15000 },
  { model: 'TATA Harrier', variants: ['Smart', 'Pure', 'Adventure', 'Accomplished'], basePrice: 1500000, incentive: 12000 },
  { model: 'TATA Nexon', variants: ['Smart', 'Pure', 'Creative', 'Fearless'], basePrice: 800000, incentive: 8000 },
  { model: 'TATA Punch', variants: ['Pure', 'Adventure', 'Accomplished', 'Creative'], basePrice: 600000, incentive: 5000 },
  { model: 'TATA Altroz', variants: ['XE', 'XM', 'XT', 'XZ', 'XZ+'], basePrice: 660000, incentive: 4000 },
  { model: 'TATA Tiago', variants: ['XE', 'XM', 'XT', 'XZ'], basePrice: 560000, incentive: 3500 },
  { model: 'TATA Tigor', variants: ['XE', 'XM', 'XT', 'XZ'], basePrice: 630000, incentive: 4000 },
];
const COLORS = ['Starlight', 'Daytona Grey', 'Orcus White', 'Tropical Mist', 'Calypso Red', 'Meteor Bronze'];

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function main() {
  console.log('Cleaning database...');
  await prisma.activity.deleteMany({});
  await prisma.notification.deleteMany({});
  await prisma.deal.deleteMany({});
  await prisma.salesPerson.deleteMany({});
  await prisma.team.deleteMany({});
  await prisma.expense.deleteMany({});

  console.log('Generating Multi-Month TATA Outlet data...');

  const teamsData = [
    { id: 'team-rajkot-1', name: 'Alpha Squad', color: '#3b82f6' },
    { id: 'team-rajkot-2', name: 'Beta Warriors', color: '#8b5cf6' },
    { id: 'team-rajkot-3', name: 'Delta Titans', color: '#10b981' },
    { id: 'team-rajkot-4', name: 'Omega Royals', color: '#f59e0b' },
  ];

  const months = ['2026-03', '2026-04'];

  for (const tData of teamsData) {
    const leaderId = `tl-${uuidv4().slice(0, 4)}`;
    const team = await prisma.team.create({
      data: {
        id: tData.id,
        name: tData.name,
        color: tData.color,
        leaderId: leaderId,
        leaderName: `Leader ${tData.name.split(' ')[0]}`,
        leaderAvatar: tData.name.split(' ')[0][0],
        memberCount: 0,
        monthlyTarget: 15000000,
        achieved: 0,
      },
    });

    const membersCount = 10;
    for (let i = 1; i <= membersCount; i++) {
      const spId = `sp-${tData.id}-${i}`;
      const sp = await prisma.salesPerson.create({
        data: {
          id: spId,
          name: i === 1 && tData.id === 'team-rajkot-1' ? 'Vikram Singh' : `SE ${tData.name.split(' ')[0]} ${i}`,
          avatar: i === 1 && tData.id === 'team-rajkot-1' ? 'VS' : `SE`,
          phone: `+91 90000 ${getRandomInt(10000, 99999)}`,
          email: `se${i}.${tData.id}@rajkottata.com`,
          teamId: team.id,
          monthlyTarget: 2000000,
          achieved: 0,
          dealsCount: 0,
          conversionRate: getRandomInt(65, 85),
          rating: getRandomInt(40, 50) / 10,
          joinedDate: '2023-01-01',
        }
      });

      // Generate deals across 2 months
      for (const month of months) {
        const dealCount = getRandomInt(15, 20);
        for (let j = 1; j <= dealCount; j++) {
          const car = getRandomItem(CAR_MODELS);
          const variant = getRandomItem(car.variants);
          const stage = month === '2026-03' ? 'Accessories' : getRandomItem(DEAL_STAGES);
          const stageIdx = DEAL_STAGES.indexOf(stage);

          // March deals are all completed/delivered
          const status = month === '2026-03' ? 'completed' : (stage === 'Accessories' && Math.random() > 0.4 ? 'completed' : 'active');

          // Incentive Logic based on Car Model
          const incentiveAmount = car.incentive;

          // RTO Logic: Force RTO done for all March deals and later-stage April deals
          const rtoNumberPlateIssued = month === '2026-03' || stageIdx >= 2;
          const incentiveStatus = rtoNumberPlateIssued ? 'Counted' : 'Pending';

          const stageProgress: any = {};
          DEAL_STAGES.forEach((s, idx) => {
            if (idx <= stageIdx) {
              stageProgress[s] = { completed: true, date: `${month}-05` };
            } else {
              stageProgress[s] = { completed: false };
            }
          });

          const day = getRandomInt(1, 28).toString().padStart(2, '0');
          const dateStr = `${month}-${day}`;

          await prisma.deal.create({
            data: {
              id: `D-${month}-${spId}-${j}`,
              customerName: `Customer ${month}-${j}`,
              customerPhone: `+91 80000 ${getRandomInt(10000, 99999)}`,
              carModel: car.model,
              carVariant: variant,
              color: getRandomItem(COLORS),
              stage: stage,
              status: status,
              amount: car.basePrice + getRandomInt(50000, 200000),
              downPayment: getRandomInt(100000, 500000),
              salespersonId: sp.id,
              teamId: team.id,
              createdAt: dateStr,
              updatedAt: dateStr,
              expectedDelivery: `${month}-30`,
              notes: 'Generated deal',
              stageProgress: JSON.stringify(stageProgress),
              incentiveAmount: incentiveAmount,
              incentiveStatus: incentiveStatus,
              rtoNumberPlateIssued: rtoNumberPlateIssued,
              insuranceType: Math.random() > 0.4 ? 'In-house' : 'Self',
              financeType: Math.random() > 0.5 ? 'In-house' : '3rd Party',
              financeStatus: stageIdx >= 1 ? 'Approved' : 'Pending',
              isExchange: Math.random() > 0.7,
              exchangeCarDetails: Math.random() > 0.7 ? 'Swift 2018 VXI, 45k km' : null,
              nextFollowUpDate: `${month}-${getRandomInt(10, 28)}`,
              nextFollowUpTask: getRandomItem(['Collect bank statement', 'Home Test Drive requested', 'Address proof pending', 'Booking amount follow-up']),
            }
          });
        }
      }
    }
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
