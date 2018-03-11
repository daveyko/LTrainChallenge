const margin = {
  top: 200,
  right: 350,
  bottom: 380,
  left: 300
};

const width = document.getElementById('movingCircles').offsetWidth - margin.left - margin.right - 10,
  height = 400;

//SVG container
const svg = d3.select('#movingCircles')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + (margin.left + width / 2) + ',' + (margin.top + height / 2) + ')');

const color = 'lightgrey';

const defs = svg.append('defs');

const circleWrapper = svg.append('g')
  .attr('class', 'circleWrapper');

const transportGroup = circleWrapper.append('g');

const transportModes = transportGroup.selectAll('transportModes')
  .data(transport)
  .enter().append('circle')
  .attr('class', 'transportModes')
  .attr('cx', function (d) {
    return d.cx;
  })
  .attr('cy', function (d) {
    return d.cy;
  })
  .attr('r', 6)
  .style('fill', 'black');

const transportNames = transportGroup.selectAll('.transportText')
  .data(transport)
  .enter().append('text')
  .attr('class', 'transportText')
  .text(function (d) {
    return d.type;
  })
  .attr('text-anchor', 'center')
  .attr('x', function (d) {
    return d.cx - 25;
  })
  .attr('y', function (d) {
    return d.cy + 25;
  });

const befordStart = circleWrapper.selectAll('.bedfordStart')
  .data(trainData.filter(function (d) {
    return d.source === 'bedford';
  }))
  .enter()
  .append('circle')
  .attr('class', 'bedfordStart')
  .attr('cx', function (d) {
    return Math.floor(Math.random() * 101 - 50);
  })
  .attr('cy', function (d) {
    return Math.floor(Math.random() * 101 - 50);
  })
  .attr('r', 5)
  .style('fill', color);

const subwayStart = circleWrapper.selectAll('.subwayStart')
  .data(trainData.filter(function (d) {
    return d.source === 'subway';
  }))
  .enter()
  .append('circle')
  .attr('class', 'subwayStart')
  .attr('cx', function (d) {
    return Math.floor(Math.random() * 50 - 340);
  })
  .attr('cy', function (d) {
    return Math.floor(Math.random() * 101 - 50);
  })
  .attr('r', 5)
  .style('fill', 'grey');

const citi6Start = circleWrapper.selectAll('.citi6Start')
  .data(trainData.filter(function (d) {
    return d.source === 'citi-N6';
  }))
  .enter()
  .append('circle')
  .attr('class', 'citiStart')
  .attr('cx', function (d) {
    return Math.floor(Math.random() * 50 + 340);
  })
  .attr('cy', function (d) {
    return Math.floor(Math.random() * 101 - 50);
  })
  .attr('r', 5)
  .style('fill', 'brown');

const citi8Start = circleWrapper.selectAll('.citi8Start')
  .data(trainData.filter(function (d) {
    return d.source === 'citi-N8';
  }))
  .enter()
  .append('circle')
  .attr('class', 'citi8Start')
  .attr('cx', function (d) {
    return Math.floor(Math.random() * 101 - 50);
  })
  .attr('cy', function (d) {
    return Math.floor(Math.random() * 50 - 340);
  })
  .attr('r', 5)
  .style('fill', 'tan');

const citiBerry = circleWrapper.selectAll('.citiBerry')
  .data(trainData.filter(function (d) {
    return d.source === 'citi-berry';
  }))
  .enter()
  .append('circle')
  .attr('class', 'citiBerry')
  .attr('cx', function (d) {
    return Math.floor(Math.random() * 101 - 50);
  })
  .attr('cy', function (d) {
    return Math.floor(Math.random() * 50 + 320);
  })
  .attr('r', 5)
  .style('fill', 'red');

const citiMetro = circleWrapper.selectAll('.citiMetro')
  .data(trainData.filter(function (d) {
    return d.source === 'citi-Metro';
  }))
  .enter()
  .append('circle')
  .attr('class', 'citiMetro')
  .attr('cx', function (d) {
    return Math.floor(Math.random() * 50 - 300);
  })
  .attr('cy', function (d) {
    return Math.floor(Math.random() * 50 - 270);
  })
  .attr('r', 5)
  .style('fill', 'blue');

const citiRoebling = circleWrapper.selectAll('.citiRoebling')
  .data(trainData.filter(function (d) {
    return d.source === 'citi-Roebling';
  }))
  .enter()
  .append('circle')
  .attr('class', 'citiRoebling')
  .attr('cx', function (d) {
    return Math.floor(Math.random() * 50 + 250);
  })
  .attr('cy', function (d) {
    return Math.floor(Math.random() * 50 - 270);
  })
  .attr('r', 5)
  .style('fill', 'green');

repeat();

///////////////////////////////////////////////////////////////////////////
/////////////////////// Move in and out function //////////////////////////
///////////////////////////////////////////////////////////////////////////

//Continuously moves the circles outward and inward
function repeat() {

  const dur = 1000,
    del = 500;

  //Interpolate the fuzzyness
  d3.selectAll('.blurValues')
    .transition().duration(dur * 0.1)
    .delay(function (d, i) {
      return i * del;
    })
    .attrTween('stdDeviation', function () {
      return d3.interpolateString('0 0', '9 0');
    })
    .transition().duration(dur * 0.2)
    .attrTween('stdDeviation', function () {
      return d3.interpolateString('9 0', '0 0');
    })
    .transition().duration(dur * 0.4) //Another one for the circles moving back in
    .delay(function (d, i) {
      return steps * del + i * del;
    })
    .attrTween('stdDeviation', function () {
      return d3.interpolateString('0 0', '9 0');
    })
    .transition().duration(dur * 0.3)
    .attrTween('stdDeviation', function () {
      return d3.interpolateString('9 0', '0 0');
    });

  //Move circles in an out
  d3.selectAll('.flyCircle')
    .transition('flyOut').duration(dur)
    .delay(function (d, i) {
      return d.id * del;
    })
    .ease('quad')
    .attr('cx', height / 2 * 0.8)
    // .attr("cx", function(d){return transportCoords[d[target]][0]})
    .transition('flyIn').duration(dur / 3)
    .delay(function (d, i) {
      return steps * del + d.id * del;
    })
    .ease('sin')
    .attr('cx', 0)
    .call(endall, repeat);

} //repeat

//Function to only run once after the last transition ends
function endall(transition, callback) {
  let n = 0;
  transition
    .each(function () {
      ++n;
    })
    .each('end', function () {
      if (!--n) callback.apply(this, arguments);
    });
} //endall
