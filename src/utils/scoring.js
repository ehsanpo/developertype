import questions from '../../data/questions.json'
import archetypes from '../../data/archetypes.json'

export function calculateScores(answers) {
  const scores = {}
  
  archetypes.archetypes.forEach(archetype => {
    scores[archetype.id] = 0
  })
  
  Object.entries(answers).forEach(([questionId, answerId]) => {
    const question = questions.questions.find(q => q.id === parseInt(questionId))
    if (!question) return
    
    const answer = question.answers.find(a => a.id === answerId)
    if (!answer) return
    
    Object.entries(answer.archetypes).forEach(([archetypeId, points]) => {
      scores[archetypeId] = (scores[archetypeId] || 0) + points
    })
  })
  
  return scores
}

export function getTopArchetypes(scores, count = 2) {
  return Object.entries(scores)
    .map(([id, score]) => {
      const archetype = archetypes.archetypes.find(a => a.id === id)
      return {
        id,
        name: archetype?.name || id,
        score
      }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
}

export function analyzePatterns(answers, scores) {
  const insights = {
    traits: [],
    tensions: [],
    workStyle: null
  }
  
  const hasHighShipIt = scores['ship-it'] >= 10
  const hasHighCraftsman = scores['craftsman'] >= 10
  const hasHighDetective = scores['detective'] >= 8
  const hasHighCalm = scores['calm-senior'] >= 8
  const hasHighGlue = scores['glue-dev'] >= 6
  const hasHighExperimenter = scores['experimenter'] >= 6
  
  if (hasHighShipIt && hasHighCraftsman) {
    insights.tensions.push({
      type: 'speed-vs-quality',
      description: 'You feel the tension between shipping fast and doing things right. This is a strength when balanced.'
    })
  }
  
  if (hasHighDetective && hasHighShipIt) {
    insights.tensions.push({
      type: 'curiosity-vs-action',
      description: 'You balance deep investigation with pragmatic action. You know when to dig and when to ship.'
    })
  }
  
  if (scores['rewrite-everything'] >= 6 && scores['historian'] >= 6) {
    insights.tensions.push({
      type: 'new-vs-legacy',
      description: 'You respect history but crave modernization. You see both the value and cost of legacy systems.'
    })
  }
  
  if (hasHighGlue || scores['grow-the-junior'] >= 6) {
    insights.workStyle = 'collaborative'
    insights.traits.push('Values team success over individual output')
  }
  
  if (hasHighCalm && hasHighDetective) {
    insights.workStyle = 'methodical'
    insights.traits.push('Thinks before acting, even under pressure')
  }
  
  if (hasHighExperimenter || scores['ai-first-dev'] >= 6) {
    insights.workStyle = 'exploratory'
    insights.traits.push('Learns by doing and trying new approaches')
  }
  
  if (hasHighShipIt && scores['experimenter'] >= 4) {
    insights.workStyle = 'rapid-iteration'
    insights.traits.push('Moves fast, learns from production')
  }
  
  return insights
}

export function generateResult(answers) {
  const scores = calculateScores(answers)
  const topTwo = getTopArchetypes(scores, 2)
  const patterns = analyzePatterns(answers, scores)
  
  const primaryArchetype = archetypes.archetypes.find(a => a.id === topTwo[0].id)
  const secondaryArchetype = archetypes.archetypes.find(a => a.id === topTwo[1].id)
  
  return {
    primary: {
      ...primaryArchetype,
      score: topTwo[0].score,
      percentage: Math.round((topTwo[0].score / 60) * 100)
    },
    secondary: {
      ...secondaryArchetype,
      score: topTwo[1].score,
      percentage: Math.round((topTwo[1].score / 60) * 100)
    },
    insights: patterns,
    allScores: scores
  }
}

export function getCombinationSummary(primaryId, secondaryId) {
  const combinations = {
    'ship-it,detective': 'You move fast but not recklessly. When issues arise, you investigate thoroughly before shipping fixes.',
    'craftsman,calm-senior': 'You care about quality but know when to prioritize. Experience has taught you which battles matter.',
    'detective,historian': 'You understand systems deeply through both investigation and institutional memory. You know the why behind everything.',
    'glue-dev,grow-the-junior': 'You multiply team effectiveness through coordination and teaching. Your impact extends far beyond your own code.',
    'experimenter,ai-first-dev': 'You embrace new tools and learn by trying. Prototypes and AI help you explore possibilities quickly.',
    'architecture-astronaut,craftsman': 'You design elegant systems and implement them with care. Long-term thinking meets quality execution.',
    'calm-senior,ship-it': 'You balance experience with pragmatism. You know when to move fast and when to slow down.',
    'rewrite-everything,experimenter': 'You love greenfield work and trying new approaches. Modern solutions excite you more than maintaining old ones.',
    'historian,comfort-zone-keeper': 'You value stability and institutional knowledge. You prefer proven approaches and remember why things are the way they are.',
    'glue-dev,calm-senior': 'You stabilize teams through coordination and steady judgment. You are trusted to handle ambiguity and pressure.',
  }
  
  const key = `${primaryId},${secondaryId}`
  const fallback = `You combine ${primaryId.replace(/-/g, ' ')} instincts with ${secondaryId.replace(/-/g, ' ')} tendencies, creating a unique problem-solving approach.`
  return combinations[key] || fallback
}
