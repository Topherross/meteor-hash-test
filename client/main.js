import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';
import hasher from '../imports/hasher';

import './main.html';

Template.hasher.onCreated(function hasherOnCreated() {
    this.output = new ReactiveVar('');
});

Template.hasher.helpers({
    output() {
        return Template.instance().output.get();
    },
});

Template.hasher.events({
    'submit .hash-form'(event, instance) {
        event.preventDefault();

        instance.output.set(hasher().decode($('#hash').val(), $('#string-length').val()));
    },
});
