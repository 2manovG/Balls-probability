//get value of ksi
function getKsi(n, m)
{
	let marks = [];
	for (let i = 0; i < m; i++) marks.push(Math.floor(Math.random() * n));
	
	return new Set(marks).size;
}

//carry out n experiments
function experiment(n, m, count) //generate array [[p1, p2, ..., pn], [m1, m2, ..., mn], [d1, d2, ..., dn]]
{
	let successes = 0, summ = 0, summSqr = 0; //ammount of successfull experiments
	let v = [[], [], []]; //array of p, m and d
	
	for (let i = 1; i <= count; i++)
	{
		let ksi = getKsi(n, m);
		successes += (ksi == n);
		summ += ksi;
		summSqr += ksi * ksi;
		
		v[0].push(successes / i);
		v[1].push(summ / i);
		v[2].push(summSqr / i - summ * summ / i / i);
	}
	return v;
}

//now we need to find propper value of p, m and d
//find C(k, n)
function C(k, n)
{
	let c = 1;
	for (let i = 1; i <= k; i++) c *= (n - k + i) / i;
	return c;
}
//find P(A)
function correct_pmd(n, m)
{
	let p = 0; //probability
	for (let k = 0; k <= n; k++) p += (1 - k % 2 * 2) * C(k, n) * Math.pow(1 - k/n, m);
	
	let e = n * (1 - Math.pow((n - 1) / n, m)); //expectation
	
	let d = Math.pow(n - 1, m) / Math.pow(n, m - 1) * (1 - Math.pow((n - 1) / n, m)) +
		(n - 1) / Math.pow(n, m - 1) * (Math.pow(n - 2, m) - Math.pow(n - 1, 2*m) / Math.pow(n, m)); //dispersion
	
	return [p, e, d];
}