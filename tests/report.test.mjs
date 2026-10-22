import {test} from 'node:test';
import assert from 'node:assert/strict';
import {buildReport,demoResult,DEMO} from '../worker/index.js';
function done(){const claims=demoResult();return{mode:'demo',createdAt:'2026-10-22T00:00:00Z',completedAt:'2026-10-22T00:01:00Z',claims,warnings:['日期提醒'],reviews:Object.fromEntries(claims.map(c=>[c.id,{action:'accept',note:'核对原文',time:'2026-10-22T00:01:00Z'}]))}}
test('完整报告保留证据、复算、人工意见与日期',()=>{const text=buildReport(done(),DEMO);for(const expected of ['构造案例预设结果','20%','5个百分点','核对原文','2026-10-22T00:01:00Z','2026-03-20','公司尚未与该国际芯片厂商签订独家供货协议','日期提醒'])assert.ok(text.includes(expected),expected)});
test('未完成的核查不能导出成完成报告',()=>{const d=done();delete d.completedAt;assert.throws(()=>buildReport(d,DEMO),/先完成/)});
