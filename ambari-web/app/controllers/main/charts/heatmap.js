/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with this
 * work for additional information regarding copyright ownership. The ASF
 * licenses this file to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

var App = require('app');

App.MainChartsHeatmapController = Em.Controller.extend({
  name: 'mainChartsHeatmapController',
  cluster: App.Cluster.find(1),
  allMetrics: [ Em.Object.create({
    label: Em.I18n.t('charts.heatmap.category.host'),
    category: 'host',
    items: [ App.MainChartHeatmapDiskSpaceUsedMetric.create(), App.MainChartHeatmapMemoryUsedMetric.create() /*, App.MainChartHeatmapProcessRunMetric.create()*/ ]
  }) ],

  selectedMetric: null,
  /**
   *  route on host detail page
   * @param event
   */
  routeHostDetail: function(event){
    App.router.transitionTo('main.hostDetails.summary', event.context)
  },
  showHeatMapMetric: function (event) {
    var metricItem = event.context;
    if (metricItem) {
      this.set('selectedMetric', metricItem);
    }
  },

  hostToSlotMap: function () {
    return this.get('selectedMetric.hostToSlotMap');
  }.property('selectedMetric.hostToSlotMap'),

  loadMetrics: function () {
    var selectedMetric = this.get('selectedMetric');
    if (selectedMetric) {
      selectedMetric.refreshHostSlots();
    }
  }.observes('selectedMetric'),

  /**
   * return class name for to be used for containing each rack.
   * 
   * @this App.MainChartsHeatmapController
   */
  rackClass: function () {
    var rackCount = this.get('cluster.racks.length');
    if (rackCount < 2) {
      return "span12";
    } else if (rackCount == 2) {
      return "span6";
    } else {
      return "span4";
    }
  }.property('cluster')
});