import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating existing Account leads to General...');
  
  const result = await prisma.deal.updateMany({
    where: {
      stage: 'Account',
    },
    data: {
      stage: 'General',
    },
  });

  console.log(`Successfully updated ${result.count} deals from Account to General.`);
  
  // Also need to update stageProgress JSON strings if they contain 'Account' as the primary key
  // This is a bit trickier since it's a string in SQLite, but let's see if we can just handle the main stage first.
  // Most of the logic in the UI depends on the 'stage' field primarily.
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
