import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  // Create chapters
  const chapters = [
    {
      title: 'Linear Equations',
      outline: {
        topics: [
          'Introduction to linear equations',
          'Solving linear equations in one variable',
          'Word problems involving linear equations',
          'Graphical representation of linear equations'
        ]
      }
    },
    {
      title: 'Polynomials',
      outline: {
        topics: [
          'Introduction to polynomials',
          'Types of polynomials',
          'Operations on polynomials',
          'Factorization of polynomials'
        ]
      }
    },
    {
      title: 'Introduction to Trigonometry',
      outline: {
        topics: [
          'Basic trigonometric ratios',
          'Trigonometric identities',
          'Applications of trigonometry',
          'Heights and distances'
        ]
      }
    }
  ]

  for (const chapter of chapters) {
    await prisma.chapter.upsert({
      where: { title: chapter.title },
      update: {},
      create: {
        title: chapter.title,
        outline: chapter.outline
      }
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
