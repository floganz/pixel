class CampaignsController < ApplicationController
  respond_to :json
  def create
    @campaign = Campaign.new campaign_params
    if @campaign.save
      render :status => 200,
       :json => { :success => true,
                  :info => "created",
                  :campaign => @campaign
       } 
    else
      render :status => 200,
       :json => { :success => false,
                  :info => "create fail",
       }
    end
  end

  def update
    @campaign = Campaign.update params[:id], campaign_params
    if @campaign.save
      render :status => 200,
       :json => { :success => true,
                  :info => "updated",
                  :campaign => @campaign
       } 
    else
      render :status => 200,
       :json => { :success => false,
                  :info => "update fail",
       }
    end
  end

  def destroy
    @campaign = Campaign.find params[:id]
    if @campaign.destroy
      render :status => 200,
       :json => { :success => true,
                  :info => "deleted",
       } 
    else
      render :status => 200,
       :json => { :success => false,
                  :info => "delete fail",
       }
    end
  end

  def index
    ids = []
    @campaigns = Campaign.where(user_id: params[:user_id])
      .offset(params[:offset])
      .limit(params[:limit])
      .each { |c| ids.push c.id }
    targets = Target.with_count("'#{ids.join("','")}'").group_by {|r| r.campaign_id }
    z = @campaigns.map do |q|
      {
        :id => q.id,
        :name => q.name,
        :targets => targets[q.id].try(:[], 0..11)
      }
    end
    render json: z
  end

  def search
    ids = []
    @campaigns = Campaign.search(params[:q], {
      offset: params[:offset],
      limit: params[:limit],
      load: false,
      where: { user_id: params[:user_id] },
      misspellings: {edit_distance: 10},
      minimum_should_match: 1
    }).each { |c| ids.push c.id }
    targets = Target.with_count("'#{ids.join("','")}'").group_by {|r| r.campaign_id }
    z = @campaigns.map do |q|
      {
        :id => q.id,
        :name => q.name,
        :targets => targets[q.id].try(:[], 0..11)
      }
    end
    render json: z
  end

  def show
    @campaigns = Campaign.find params[:id]
    render json: @campaigns
  end

  private
    def campaign_params
      params.require(:campaign).permit(:name, :user_id)
    end
end
