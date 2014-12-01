PlayerList =  new Mongo.Collection('players');
if(Meteor.isClient)
{
    Template.leaderboard.helpers({
            'player': function()
            {
                return PlayerList.find({},{sort:{Score:-1}});
            },
            'selectedClass':function(){

                var playerId = this._id;
                var selectedPlayer = Session.get('selectedPlayer');
                if(playerId == selectedPlayer)
                return 'selected';

            },
        'showSelectedPlayer':function(){

            var selectedPlayer = Session.get('selectedPlayer');
            return PlayerList.findOne(selectedPlayer);
        }


        });
    Template.leaderboard.events({

        'click .player':function(){

            var playerId = this._id;
            Session.set('selectedPlayer',playerId);

    },
        'click .increment':function(){

            var selectedPlayer = Session.get('selectedPlayer');
            PlayerList.update(selectedPlayer,{$inc:{Score:5}});
        },
        'click .decrement':function(){

            var selectedPlayer = Session.get('selectedPlayer');
            PlayerList.update(selectedPlayer,{$inc:{Score:-5}});
        }


    });

    Template.addPlayerForm.events({

        'submit form':function(event)
        {
            event.preventDefault();
            var playerNameVar = event.target.playerName.value;
            PlayerList.insert({
                Name:playerNameVar,
                Score:0
            });

        }

    });
}

if(Meteor.isServer)
{

}
